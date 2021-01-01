const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    code: Number,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", ProfessorSchema);
