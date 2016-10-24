const express = require('express');
const router = express.Router();

const Board = require('../models/Board')

router.route('/')
 .get((req, res) => {
   Board.find({}, (err, boards) => {
     console.log('boards: ', boards)
     res.status(err ? 400 : 200).send(err || boards)
   })
 })

 .post((req, res) => {
   Board.create(req.body.board, (err, boards) => {
     Board.find({}, (err, boards) => {
       res.status(err ? 400 : 200).send(err || boards)
     })
   })
 })

 .put((req, res) => {
   console.log('req.body.board.id: ', req.body.board._id)
   console.log('req.body.board: ', req.body.board)
   Board.findByIdAndUpdate(req.body.board._id, {$set: req.body.board})
     .then(() => {
       res.send()
     })
     .catch((err) => {
       res.status(400).send(err)
     })
 })

 router.route('/:id')
 .get((req, res) => {

   Board.findOne({ name: req.params.id },(err,board) => {
     console.log('in get by id');
     console.log('board: ', board)
     res.status(err ? 400 : 200).send(err || board)
   })
 })

module.exports = router;
