const express = require("express");
const router = express.Router();

const student = require("../controllers/student.controller");

router.get("/", student.getAllStudents);
router.get("/:id", student.getStudent);
router.get("/:id/:level", student.getBestOfStudent);
module.exports = router;
