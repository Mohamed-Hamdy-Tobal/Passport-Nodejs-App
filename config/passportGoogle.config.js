import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/user.model.js";
import { config } from "./config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecretKey,
      callbackURL: "/auth/google/cb",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google PROFILE  : ", profile);
        let user = await UserModel.findOne({
          googleId: profile?.id,
        });
        if (!user) {
          const email =
            profile.emails?.[0]?.value ||
            `${profile.given_name.toLowerCase()}@google.com`;
          const username =
            `${profile.displayName}_${profile.id.toString().slice(4)}` ||
            `user_${profile.id}`;
          user = await UserModel.create({
            username,
            email,
            googleId: profile?.id,
            provider: "google",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    if (err) return done(err);
    done(null, user);
  });
});

export const passportGoogle = passport;
