const mongoose = require("mongoose");
const { Schema } = mongoose;

const StatSchema = new Schema(
  {
    student_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    1: [
      {
        time: String,
        score: String,
      },
    ],
    2: [
      {
        time: String,
        score: String,
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stat", StatSchema);
