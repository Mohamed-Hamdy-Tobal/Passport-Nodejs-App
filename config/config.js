import dotenv from "dotenv";

dotenv.config();

export const config = {
  dbUrl: process.env.MONGO_URL,
  port: process.env.PORT || 4000,
  sessionKey: process.env.SESSION_SECRET_KEY,
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecretKey: process.env.GITHUB_CLIENT_SECRET_KEY,
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecretKey: process.env.FACEBOOK_CLIENT_SECRET_KEY,
  },
};
