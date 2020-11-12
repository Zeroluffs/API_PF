const express = require("express");
const router = express.Router();

const student = require("../controllers/student.controller");

router.get("/", student.getAllStudents);
router.get("/:id", student.getStudent);
router.get("/:id/:level", student.getBestOfStudent);
router.get("/:id/try/:level", student.getTryPerLevel);

router.put("/", student.makePassword);
module.exports = router;
