import express from "express";
import {
  getSignup,
  getLogin,
  postSignup,
  postLogin,
  authLogout,
} from "../controllers/auth.controller.js";
import multer from "multer";
import { isGuest } from "../middleware/auth.middleware.js";
import {
  githubCallback,
  githubCallbackHandler,
  githubLogin,
} from "../controllers/githubAuth.controller.js";
import {
  facebookLogin,
  facebookCallback,
  facebookCallbackHandler,
} from "../controllers/facebookAuth.controller.js";
import {
  googleLogin,
  googleCallback,
  googleCallbackHandler,
} from "../controllers/googleAuth.controller.js";

const router = express.Router();

router
  .route("/signup")
  .get(isGuest, getSignup)
  .post(multer().any(), postSignup);

router.route("/login").get(isGuest, getLogin).post(multer().any(), postLogin);

// middleware triggers the authentication process with GitHub
router.route("/auth/github").get(githubLogin);

// GitHub authentication callback
router.route("/auth/github/cb").get(githubCallback, githubCallbackHandler);

// middleware triggers the authentication process with Facebook
router.route("/auth/facebook").get(facebookLogin);

// Facebook authentication callback
router
  .route("/auth/facebook/cb")
  .get(facebookCallback, facebookCallbackHandler);

// middleware triggers the authentication process with google
router.route("/auth/google").get(googleLogin);

// google authentication callback
router.route("/auth/google/cb").get(googleCallback, googleCallbackHandler);

router.route("/logout").all(authLogout);

export const authRouter = router;
