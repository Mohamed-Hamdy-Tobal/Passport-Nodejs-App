import { passportGoogle } from "../config/passportGoogle.config.js";
import { handleResponse } from "../util/handleResponse.js";
import { STATUS_CODES } from "../util/StatusCodes.js";

// Initiates google authentication
export const googleLogin = passportGoogle.authenticate("google", {  scope: ['profile', 'email'] });

// Handles google authentication callback
export const googleCallback = passportGoogle.authenticate("google", {
  failureRedirect: "/login",
});

// Final response after successful google authentication
export const googleCallbackHandler = (req, res) => {
  return handleResponse(
    res,
    {
      success: true,
      status: STATUS_CODES.SUCCESS,
      renderView: "index",
    },
    req
  );
};
