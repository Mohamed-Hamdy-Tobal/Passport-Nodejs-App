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
import { passportGithub } from "../config/passportGithub.config.js";
import { handleResponse } from "../util/handleResponse.js";
import { STATUS_CODES } from "../util/StatusCodes.js";

const router = express.Router();

router
  .route("/signup")
  .get(isGuest, getSignup)
  .post(multer().any(), postSignup);

router.route("/login").get(isGuest, getLogin).post(multer().any(), postLogin);

// middleware triggers the authentication process with GitHub
router.route("/auth/github").get(
  passportGithub.authenticate("github", {
    scope: ["user"],
  })
);

// will redirect to after the user has successfully authenticated with GitHub.
router
  .route("/auth/github/cb")
  .get(
    passportGithub.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => {
      return handleResponse(
        res,
        {
          success: true,
          status: STATUS_CODES.SUCCESS,
          renderView: "index",
        },
        req
      );
    }
  );

router.route("/logout").all(authLogout);

export const authRouter = router;
