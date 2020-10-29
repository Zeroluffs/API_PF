const express = require("express");
const router = express.Router();
const history = require('../controllers/history.controller')
router.get("/", history.getHistory)
router.post('/:id', history.createHistoryEntry)
router.put('/:id', history.updateEntry)
router.get("/:id/:qnumber", history.getHistoryByQN)
router.get("/:id/", history.getHistoryEntryByUser)
module.exports = router;