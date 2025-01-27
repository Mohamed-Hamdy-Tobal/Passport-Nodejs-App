import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
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
    unique: true,
    sparse: true,
    default: '',
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
    default: '',
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    default: '',
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
