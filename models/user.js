const { Schema, model } = require("mongoose");
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      // [true, 'Email is required'],
      unique: true,
      match: emailRegex,
    },
    // subscription: {
    //     type: String,
    //     enum: ["starter", "pro", "business"],
    //     default: "starter"
    // },
    // token: {
    //     type: String,
    //     default: null,
    // },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = { User };
