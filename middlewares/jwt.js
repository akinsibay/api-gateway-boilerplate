/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../helpers/authHelpers';
import ErrorClass from '../helpers/ErrorClass';
export const verifyAccessToken = (req, res, next) => {
	const token = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");
	if (!token) {
		return next(new ErrorClass("No Auth token in header", 401));
	}
	const accessToken = getAccessTokenFromHeader(req);
	jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, payload) => {
		if (err) {
			return next(new ErrorClass("Error in token verify", 401));
		}
		req.user = {
			id: payload.id,
			username: payload.username
		};
		next();
	});
};