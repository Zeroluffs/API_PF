const Answer = require("../models/Answer");
const History = require("../models/History");

const answerCtrl = {};

answerCtrl.createAnswer = async (req, res) => {
  const answer = new Answer({
    questionNumber : req.body.questionNumber,
    index: req.body.index,
    answer: req.body.answer,
    problem: req.body.problem,
    pos_x: req.body.pos_x,
    pos_y: req.body.pos_y,
    historyEntry_id: req.params.id,
  });
  await answer.save();
  await History.findByIdAndUpdate(
    req.params.id,
    { $push: { answer: answer } },
    { new: true, useFindAndModify: false }
  );

  await History.findById(req.params.id).populate("answer");
  res.send(answer._id)
};

answerCtrl.getAnswerByHistoryEntry = async (req,res) =>{
    id1= req.params.id
    const history = await History.findById(id1).populate('answer')
    res.json(history.answer)
}



module.exports = answerCtrl;
