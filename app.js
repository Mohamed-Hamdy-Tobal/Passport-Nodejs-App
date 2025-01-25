import express from "express";
import mongoose from "mongoose";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import ConnectMongoDBSession from "connect-mongodb-session";
import session from "express-session";
import cookieParser from "cookie-parser";
import { config } from "./config/config.js";
import { homeRouter } from "./routes/home.route.js";
import flash from "connect-flash";
import { authRouter } from "./routes/auth.route.js";
import passport from "./config/passport.config.js";

const app = express();
const MongoDBStore = ConnectMongoDBSession(session);

mongoose.connect(config.dbUrl).then(() => {
  console.log("mongodb server started");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(flash());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "assets")));
app.use(express.static(join(__dirname, "public")));

const store = new MongoDBStore({
  uri: config.dbUrl,
  collection: "sessions",
});

store.on("error", (error) => {
  console.error("Session store error:", error);
});

app.use(
  session({
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", homeRouter);
app.use("/", authRouter);

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: 404,
    message: "this resource is not available",
  });
});

app.listen(config.port, () => {
  console.log("app is running");
});
