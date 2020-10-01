const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnswerSchema = new Schema(
  {
    questionNumber: String,
    problem: String,
    index: String,
    answer: String,
    pos_x: String,
    pos_y: String,
    historyEntry_id: {
      type: Schema.Types.ObjectId,
      ref: "History",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Answer", AnswerSchema);
