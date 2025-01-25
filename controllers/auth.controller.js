import { handleResponse } from "../util/handleResponse.js";

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
