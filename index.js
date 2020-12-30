const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const { mongoose } = require("./database");
require("dotenv").config({ path: "variables.env" });

//settings
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//routes
app.use("/api/leaderboard", require("./server/routes/leaderboard.routes"));
app.use("/api/history", require("./server/routes/history.routes"));
app.use("/api/answer", require("./server/routes/answer.routes"));
app.use("/api/students", require("./server/routes/students.routes"));
app.use("/api/users", require("./server/routes/users.routes"));
app.use("/api/professors", require("./server/routes/professor.routes"));
app.use("/api/stats", require("./server/routes/stat.routes"));

//starting server
app.listen(port, () => {
  console.log("Server is Working", port);
});
