import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import UserModel from "../models/user.model.js";
import { config } from "./config.js";

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecretKey,
      callbackURL: "/auth/facebook/cb",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("PROFILE From facebook : ", profile);
        let user = await UserModel.findOne({
          facebookId: profile?.id,
        });
        if (!user) {
          const email =
            profile.emails?.[0]?.value || `${profile.id}@facebook.com`;
          const username =
            profile.username ||
            profile.displayName ||
            profile.name.givenName + profile.name.familyName ||
            `user_${profile.id}`;
          user = await UserModel.create({
            username,
            email,
            facebookId: profile?.id,
            provider: "facebook",
          });
        }
        return done(null, user); // (if error, if successful)
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the user ID in the session
});

passport.deserializeUser((id, done) => {
  // Query the database to find the user by their ID
  UserModel.findById(id, (err, user) => {
    if (err) return done(err);
    done(null, user); // Attach user to the request object
  });
});

export const passportFacebook = passport;
