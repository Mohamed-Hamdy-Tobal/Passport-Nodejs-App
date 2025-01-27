import { passportGithub } from "../config/passportGithub.config.js";
import { handleResponse } from "../util/handleResponse.js";
import { STATUS_CODES } from "../util/StatusCodes.js";

// Initiates GitHub authentication
export const githubLogin = passportGithub.authenticate("github", {
  scope: ["user"],
});

// Handles GitHub authentication callback
export const githubCallback = passportGithub.authenticate("github", {
  failureRedirect: "/login",
});

// Final response after successful GitHub authentication
export const githubCallbackHandler = (req, res) => {
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
