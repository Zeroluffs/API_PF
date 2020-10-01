const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistorySchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    level: String,
    time: String,
    score: String,
    problem: String,
    answer: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("History", HistorySchema);
