const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./api/config/router');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/wedding-project';
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');

mongoose.connect(MONGODB_URI, function (err) {
  if (err) {
    console.error('Could not connect to Mongo: err:', err);
    process.exit(1);
  }
  console.log('Connected to database:', mongoose.connection.name);
});


app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(router);
console.log('app is listening on port', PORT);
app.listen(PORT, function(){
});

module.exports = app;
