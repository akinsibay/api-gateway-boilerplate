/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../helpers/authHelpers';
import CustomError from '../helpers/CustomError';
export const verifyAccessToken = (req, res, next) => {
	const token = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
	if (!token) {
		return next(new CustomError("No Auth token in header"));
	}
	const accessToken = getAccessTokenFromHeader(req);
	jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, payload) => {
		if (err) {
			return next(new CustomError("Error in token verify", 403));
		}
		req.payload = payload;
		next();
	});
};