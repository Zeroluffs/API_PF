const Leaderboard = require("../models/Leaderboard");
const Student = require("../models/Student");
const History = require("../models/History");
const express = require("express");
const leaderboardCtrl = {};

leaderboardCtrl.getBest = async (req, res) => {
  const historyEntries = await History.find();
  const test = [];
  console.log(historyEntries.length);
  for (i = 0; i < historyEntries.length; i++) {
    const n = historyEntries;
    if (n[i].level == req.params.level) {
      test.push(n[i]);
    }
  }
  const compare = function (a, b) {
    return parseInt(b.score) - parseInt(a.score);
  };
  const final = test.sort(compare);
  const bestScore = [];
  for (i = 0; i < final.length; i++) {
    bestScore.push(final[i]);
  }
  /*
  for (i = 0; i < bestScore.length; i++) {
    for (j = 0; i < bestScore.length; j++) {
      if (bestScore[i].score == bestScore[j].score) {
        if (bestScore[i].time < bestScore[j].time) {
          const temp = bestScore[i];
          bestScore[i] = bestScore[j];
          bestScore[j] = temp;
        }
      }
    }
  }*/
  for (i = 0; i < bestScore.length; i++) {
    for (j = 0; j < bestScore.length; j++) {
      if (bestScore[i].score == bestScore[j].score) {
        if (bestScore[i].time < bestScore[j].time) {
          console.log(bestScore[i].score, "here");
          const temp = bestScore[i];
          bestScore[i] = bestScore[j];
          bestScore[j] = temp;
        }
      }
    }
  }


  res.json(bestScore);
};

/*
leaderboardCtrl.getAll = async (req, res) => {
  const leaderboard = await Leaderboard.find();
  res.json(leaderboard);
};

leaderboardCtrl.createInstance = async (req, res) => {
  const leaderboard = new Leaderboard({
    user_id: req.params.id,
    score: req.body.score,
    time: req.body.time,
  });

  await leaderboard.save();

  res.json({
    status: "Instance to the Leaderboard added",
  });
};

leaderboardCtrl.showBest = async (req, res) => {
  const leaderboard = await Leaderboard.find();
  const entries = Object.entries(leaderboard);
  const test2 = [];
  for (i = 0; i < leaderboard.length; i++) {
    const n = leaderboard[i];
    if (n.score == req.params.number) {
      test2.push(n);
    }
  }
  const test = leaderboard[0];
  console.log(test.score);
  const picked = leaderboard.find((o) => o.score == "69");

  test2.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0)); 

  res.send(test2);
};

leaderboardCtrl.updateInstance = async (req, res) => {
  const leaderboard = {
    user_name: req.user_name,
    score: req.body.score,
    time: req.body.time,
  };

  await Leaderboard.findByIdAndUpdate(
    req.params.id,
    {
      $set: leaderboard,
    },
    { new: true }
  );

  res.json({
    status: "Leaderboard Updated",
  });
};
*/

module.exports = leaderboardCtrl;
