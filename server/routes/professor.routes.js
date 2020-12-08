const express = require("express");
const router = express.Router();

const user = require("../controllers/professor.controler");

router.get("/", user.getUsers);
router.get("/:id", user.getStudents);
router.post("/", user.createUser);
router.post("/login", user.logIn);
router.post("/:id", user.addStudent);
router.delete("/:id/:studentID", user.deleteStudent);

module.exports = router;
