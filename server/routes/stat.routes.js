const express = require("express");
const router = express.Router();

const stat = require("../controllers/stat.controller");

router.get("/:id/", stat.getBestOfStudent);

module.exports = router;
