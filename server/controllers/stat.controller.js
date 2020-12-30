const User = require("../models/User");
const Student = require("../models/Student");
const express = require("express");
const bcrypt = require("bcrypt");

const statCtrl = {};

statCtrl.getBestOfStudent = async (req, res) => {
  const stats = [];
  const student = await Student.findById(req.params.id).populate("history");
  for (j = 1; j < 14; j++) {
    const test2 = [];

    for (i = 0; i < student.history.length; i++) {
      const n = student.history;
      if (
        n[i].level == j.toString() &&
        n[i].score != null &&
        n[i].time != null
      ) {
        test2.push(n[i]);
        console.log("did this");
      }
    }
    //test2.sort((a, b) => (Number(a.score) < Number(b.score) ? 1 : Number(b.score) < Number(a.score) ? -1 : 0));

    const compare = function (a, b) {
      return parseInt(b.score) - parseInt(a.score);
    };
    if (test2.length != 0) {
      const final = await test2.sort(compare);
      const bestScore = final[0].score;
      console.log("this is SCORE" + bestScore);
      const object = {
        level: j,
        score: bestScore,
        time: final[0].time,
      };
      stats.push(object);
    } else {
      const object = {
        level: j,
        score: "0",
        time: "0",
      };
      stats.push(object);
    }
    //console.log(test2.sort(compare))
    //console.log(final[0])
    //  res.send(final[0]);
  }
  console.log(stats);
  res.send(stats);
};

module.exports = statCtrl;
