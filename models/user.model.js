import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    sparse: true, // Allows multiple null values (for users without email)
    lowercase: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.githubId && !this.facebookId && !this.googleId;
    },
  },
  githubId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  googleId: {
    type: String,
  },
  provider: {
    type: String,
    enum: ["local", "facebook", "github", "google"],
    default: "local",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
