const express = require('express');
const router = express.Router();

const ChosenBoard = require('../models/ChosenBoard')

router.route('/')

.get((req, res) => {
  ChosenBoard.find({}, (err, boards) => {
    console.log('in chosenboards boards: ', boards)
    res.status(err ? 400 : 200).send(err || boards)
  })
})

.post((req, res) => {
  console.log('in ChosenBoard');
  console.log('req.body.board: ', req.body.board)
  ChosenBoard.create(req.body.board)
   .then(board => {
     console.log('board: ', board)
     res.send(board)
   })
   .catch(err => {
     res.status(400).send(err)
   })
})

module.exports = router;
