import express from "express";
import axios from "axios";
import registry from "../registry.json";
import auth from './auth'
import { verifyAccessToken } from "../middlewares/jwt";
import asyncErrorHandler from "express-async-handler";
const router = express.Router();

router.use('/auth', auth);

router.all("/:apiName/:path", [verifyAccessToken], asyncErrorHandler(async (req, res) => {
  if (registry.services[req.params.apiName]) {
    const response = await axios({
      method: req.method,
      url: registry.services[req.params.apiName].url + req.params.path,
      headers: req.headers,
      data: req.body
    })
    return res.send(response.data);
  }
  res.status(404).send("API Name doesn't exist");
}));

export default router;
