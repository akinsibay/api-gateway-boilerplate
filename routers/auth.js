/* eslint-disable no-undef */
import express from "express";
import { login, logout, register } from "../controllers/auth";
import { verifyAccessToken } from "../middlewares/jwt";
const router = express.Router();
router.get('/', (req, res) => {
  res.send("users resources");
});
router.post('/register', register);
router.post('/login', login);
router.get('/logout', verifyAccessToken, logout);

export default router;
