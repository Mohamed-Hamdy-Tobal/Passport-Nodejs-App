import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
          return done(null, false, { message: "Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Invalid credentials!" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// تُستخدم لتحديد كيفية تخزين بيانات المستخدم في الجلسة.
// called only after successful authentication, which typically happens when the done callback in the authentication strategy
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// ستخدم لاسترجاع بيانات المستخدم من الجلسة.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
