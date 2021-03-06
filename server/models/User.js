const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    code: Number,
    email: { type: String, unique: true, required: true, dropDups: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
