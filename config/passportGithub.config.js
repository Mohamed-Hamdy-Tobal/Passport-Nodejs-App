import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import UserModel from "../models/user.model.js";
import { config } from "./config.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecretKey,
      callbackURL: "/auth/github/cb",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("PROFILE IS : ", profile);
        let user = await UserModel.findOne({
          githubId: profile?.id,
        });
        if (!user) {
          user = await UserModel.create({
            username: profile.username || profile.displayName,
            email: profile.emails?.[0]?.value || "",
            githubId: profile?.id,
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
  done(null, user.id);  // Store only the user ID in the session
});

passport.deserializeUser((id, done) => {
  // Query the database to find the user by their ID
  UserModel.findById(id, (err, user) => {
    if (err) return done(err);
    done(null, user); // Attach user to the request object
  });
});

export const passportGithub = passport;
