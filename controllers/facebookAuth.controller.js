import { passportFacebook } from "../config/passportFacebook.config.js";
import { handleResponse } from "../util/handleResponse.js";
import { STATUS_CODES } from "../util/StatusCodes.js";

// Initiates Facebook authentication
export const facebookLogin = passportFacebook.authenticate("facebook");

// Handles Facebook authentication callback
export const facebookCallback = passportFacebook.authenticate("facebook", {
  failureRedirect: "/login",
});

// Final response after successful facebook authentication
export const facebookCallbackHandler = (req, res) => {
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
