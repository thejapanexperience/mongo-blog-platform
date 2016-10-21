const express = require('express');
const router = express.Router();

const Burger = require('../models/Burger')

router.route('/')
 .get((req, res) => {
   Burger.find({}, (err, burgers) => {
     res.status(err ? 400 : 200).send(err || burgers)
    //  same as below
    //  if (err) {
    //    res.status(400).send(err)
    //  } else {
    //    res.send(burgers)
    //  }
   })
 })

// Version 1 with callback
 // .post((req, res) => {
 //   let burger = new Burger(req.body)
 //   burger.save((err, savedBurger) => {
 //     res.status(err ? 400 : 200).send(err || savedBurger)
 //   })
 // })

// Version 2 with promises
 .post((req, res) => {
   Burger.create(req.body)
    .then(burger => {
      res.send(burger)
    })
    .catch(err => {
      res.status(400).send(err)
    })
 })

// can use promises with mongoose. Need to set this in the app.js
// mongoose.Promise = Promise;

// Callback version
// router.route('/:id')
//   .put((req, res) => {
//     Burger.findByIdAndUpdate(req.params.id, {$set: req.body}, err => {
//       res.status(err ? 400 : 200).send(err)
//     })
//   })

// Promise version
// router.route('/:id')
//   .put((req, res) => {
//     Burger.findByIdAndUpdate(req.params.id, {$set: req.body})
//       .then(() => {
//         res.send()
//       })
//       .catch((err) => {
//         res.status(400).send(err)
//       })
//   })

// Edit the burger to double the price
router.route('/:id')
  .put((req, res) => {

    Burger.findById(req.params.id)
      .then((burger) => {
        burger.price *= 2
        return burger.save()
      })
      .then((savedBurger) => {
        res.send(savedBurger)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  })


module.exports = router;
