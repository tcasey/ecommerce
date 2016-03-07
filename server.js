var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var nodePort = 3000;

var app = express();
app.use(bodyParser.json());

var db = mongojs('ecommerce');
var collection = db.collection('products');

app.listen(nodePort, function(){
  console.log('listening on port', nodePort);
});
