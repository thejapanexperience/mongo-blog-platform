// LOAD ENV VARIABLES
require('dotenv').config();

// SET SERVER PORT
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/messageboardsdb11`

// REQUIRES
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

// Mongoose
const mongoose = require('mongoose')
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, err => {
  console.log(err || `Mongo connected to ${MONGODB_URI}`);
})

// APP DECLARATION
const app = express();

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

// WEBPACK CONFIG
const compiler = webpack(webpackConfig);
app.use(webpackHotMiddleware(compiler));
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  hot: true,
  path: webpackConfig.output.path
}));

// ROUTES
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  let filepath = path.resolve('index.html');
  res.sendFile(filepath);
});

// ALLOW REACT ROUTING
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
