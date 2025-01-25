import express from "express";
import {
  getSignup,
  getLogin,
  postSignup,
  postLogin,
  authLogout,
} from "../controllers/auth.controller.js";
import multer from "multer";

const router = express.Router();

router.route("/signup").get(getSignup).post(multer().any(), postSignup);
router.route("/login").get(getLogin).post(multer().any(), postLogin);
router.route("/logout").all(authLogout);

export const authRouter = router;
