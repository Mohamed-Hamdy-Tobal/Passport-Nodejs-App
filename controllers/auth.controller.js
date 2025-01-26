import UserModel from "../models/user.model.js";
import { handleResponse } from "../util/handleResponse.js";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { STATUS_CODES } from "../util/StatusCodes.js";
import passport from "../config/passport.config.js";

const signupSchema = Joi.object({
  username: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const getSignup = async (req, res, next) => {
  return handleResponse(
    res,
    {
      success: true,
      renderView: "signup",
    },
    req
  );
};

export const getLogin = async (req, res, next) => {
  return handleResponse(
    res,
    {
      success: true,
      renderView: "login",
    },
    req
  );
};

export const postSignup = async (req, res, next) => {
  try {
    const userData = req.body;
    console.log("userData:", userData);

    const { error } = signupSchema.validate(userData);
    if (error) {
      return handleResponse(res, {
        status: STATUS_CODES.FAIL,
        message: "Validation failed",
        error: error.details.map((detail) => detail.message),
      });
    }

    const isExistUser = await UserModel.findOne({ email: userData.email });
    if (isExistUser) {
      return handleResponse(res, {
        status: STATUS_CODES.FAIL,
        message: "A user with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new UserModel({
      ...userData,
      password: hashedPassword,
    });

    await newUser.save();

    return handleResponse(res, {
      success: true,
      status: STATUS_CODES.CREATED,
      message: "Registration Successfully Created",
      data: {
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    return handleResponse(res, {
      status: STATUS_CODES.ERROR,
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const postLogin = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || "Login failed!",
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return handleResponse(
        res,
        {
          success: true,
          status: STATUS_CODES.SUCCESS,
          message: "Login Successfully",
          data: {
            user,
          },
        },
        req
      );
    });
  })(req, res, next);
};

export const authLogout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return handleResponse(res, {
          status: STATUS_CODES.ERROR,
          message: "Failed to log out. Please try again.",
        });
      }

      res.clearCookie("connect.sid", {
        path: "/",
      });

      console.log("GOOD");

      return handleResponse(res, {
        success: true,
        status: STATUS_CODES.SUCCESS,
        message: "Logged out successfully.",
      });
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return handleResponse(res, {
      status: STATUS_CODES.ERROR,
      message: "An error occurred during logout.",
    });
  }
};
