const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfessorSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    code: Number,
    student: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Professor", ProfessorSchema);
