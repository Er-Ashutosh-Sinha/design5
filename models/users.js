const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  age: {
    type: Number,
    required: true,
  },
  secret: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
