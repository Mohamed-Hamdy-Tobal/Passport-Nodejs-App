import express from "express";
import mongoose from "mongoose";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { config } from "./config/config.js";

const app = express();

mongoose.connect(config.dbUrl).then(() => {
  console.log("mongodb server started");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, "assets")));
app.use(express.static(join(__dirname, "public")));

// Routers
app.use("/", (req, res) => {
  res.send("Hello, world!");
});

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: 404,
    message: "this resource is not available",
  });
});

app.listen(config.port, () => {
  console.log("app is running");
});
