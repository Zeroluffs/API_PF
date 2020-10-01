const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true, dropDups: true },
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
