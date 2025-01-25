import express from "express";
import { getSignup, getLogin } from "../controllers/auth.controller.js";
import multer from "multer";

const router = express.Router();

router.route("/signup").get(getSignup);
// .post(multer().any(), postSignup);
router.route("/login").get(getLogin);
// router.route("/logout").all(authLogout);

export const authRouter = router;
