import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        if (this.githubId) return true;
        return validator.isEmail(value);
      },
      message: "Field must be a valid email address",
    },
    required: function () {
      return !this.githubId;
    },
  },
  password: {
    type: String,
    required: function () {
      return !this.githubId;
    },
  },
  githubId: {
    type: String,
    sparse: true,
    default: null,
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
