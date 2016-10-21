const mongoose = require('mongoose')
require('dotenv').config({ silent: true });
const { MLABPW } = process.env;
console.log('MLABPW: ', MLABPW)

// const MONGO_URI =   `mongodb://thejapanexperience:${MLABPW}@ds061246.mlab.com:61246/richarddb`
const MONGO_URI =   `mongodb://localhost/testdb`


mongoose.connect(MONGO_URI, err => {
  console.log(err || `Mongo connected to ${MONGO_URI}`);
})

const Burger = mongoose.model('Burger', {
  type: String,
  price: Number
})

Burger.find({}, (err, burgers) => {
  if (err) return console.log('err: ', err);
  console.log('burgers: ', burgers)
});

Burger.findOne({type:'pineapple'}, (err, burgers) => {
  if (err) return console.log('err: ', err);
  console.log('burgers: ', burgers)
});

Burger.findById('58090cba5827ae8128f73e28', (err, burgers) => {
  if (err) return console.log('err: ', err);
  console.log('burgers: ', burgers)
});

// METHODS

// find
// findOne
// findById
// FindOneAndUpdate
// FindOneAndRemove
// FindByIdAndRemove

// Make a new burger. lowercase = new document. Model is uppercase.
// Burger.find({}, (err, burgers) => {
//   if (err) return console.log('err: ', err);
//   console.log('burgers: ', burgers)
//
//   let burger = new Burger({type: 'avocado', price: 12.99})
//   // or
//   let burger2 = new Burger()
//   burger2.type = 'BigMac'
//   burger2.price = 15.00
//
//   burger.save(err => {
//     if (err) return console.log('err: ', err)
//   })
// 
//   burger2.save(err => {
//     if (err) return console.log('err: ', err)
//   })
//
// });

mongoose.disconnect()
