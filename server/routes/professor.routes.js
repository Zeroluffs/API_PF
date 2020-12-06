const express = require("express");
const router = express.Router();

const user = require("../controllers/professor.controler");

router.get("/", user.getUsers);
router.post("/", user.createUser);
router.post("/login", user.logIn);
router.post("/:id", user.addStudent);

module.exports = router;
