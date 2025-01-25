import express from "express";
import { handleResponse } from "../util/handleResponse.js";

const router = express.Router();

router.get("/", (req, res) => {
  return handleResponse(
    res,
    {
      success: true,
      renderView: "index",
    },
    req
  );
});

export const homeRouter = router;
