const express = require("express");
const router = express.Router();

const leaderboard = require("../controllers/leaderboard.controller");

router.get("/:level", leaderboard.getBest);

/*
router.get("/", leaderboard.getAll);
router.get("/:id/:number", leaderboard.showBest);
router.post("/:id", leaderboard.createInstance);
router.put("/:id", leaderboard.updateInstance);
*/
module.exports = router;
