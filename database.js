const mongoose = require("mongoose");
const URI = "mongodb://localhost/gameAPP";
require("dotenv").config({ path: "variables.env" });
mongoose
  .connect(process.env.DB_URL, {
    /**
     *
     *
     */
    auth: {
      user: "root",
      password: "root",
    },

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
