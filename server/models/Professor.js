const mongoose = require('mongoose')
const { Schema } = mongoose

const ProfessorSchema = new Schema(
  {
    name: String,
    email: String, 
    password: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Professor', ProfessorSchema)