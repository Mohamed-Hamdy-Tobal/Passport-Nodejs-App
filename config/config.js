import dotenv from "dotenv";

dotenv.config();

export const config = {
  dbUrl: process.env.MONGO_URL,
  port: process.env.PORT || 4000,
  sessionKey: process.env.SESSION_SECRET_KEY,
  github: {
    clientID: process.env.CLIENT_ID,
    clientSecretKey: process.env.CLIENT_SECRET_KEY,
  },
};
