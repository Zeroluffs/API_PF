const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true, dropDups: true },
    password: String,
    code: String,
    course: String,
    nrc: String,
    professor_id: {
      type: Schema.Types.ObjectId,
      ref: "Professor",
    },
    history: [
      {
        type: Schema.Types.ObjectId,
        ref: "History",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
