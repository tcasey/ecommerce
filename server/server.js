// Requiring in DEPENDENCIES
var express = require('express');
var session = require('express-session');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');


// Initiating express app
var app = express();
var nodePort = 3000;

// Connecting MongoDB
var db = mongojs('ecommerce');
var collection = db.collection('products');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
// first GET endpoint--READ
app.get('/api/products', function(req, res){
	var query = {};
	if(req.query.id) {
		query._id = mongo.ObjectId(req.query.id);
	}
	if(req.query.title){
		query.title = req.query.title;
	}
  // POST endpoint--CREATE
  app.post('/api/products', function(req, res){
  	collection.save(req.body, function(error, response){
  		if(error) {
  			return res.status(500).json(error);
  		} else {
  			return res.json(response);
  		}
  	})
  });
// second GET endpoint-_READ
collection.find(query, function(err, response){
		if(err) {
			res.status(500).json(err);
		} else {
			res.json(response);
		}
	});
});
// PUT endpoint--UPDATE
app.put('/api/products', function(req, res){
	if(!req.query.id){
		return res.status(400).send('id query needed');
	}
	var query = {
		_id: mongo.ObjectId(req.query.id)
	};
	collection.update(query, req.body, function(error, response){
		if(error) {
			return res.status(500).json(error);
		} else {
			return res.json(response);
		}
	})
});
// DELETE endpoint--DELETE
app.delete('/api/products', function(req, res){
	if(!req.query.id){
		return res.status(400).send('id query needed');
	};
	var query = {
		_id: mongo.ObjectId(req.query.id)
	};
	collection.remove(query, function(error, response){
		if(error) {
			return res.status(500).json(error);
		} else {
			return res.json(response);
		}
	})
});
// listening in on specified port
app.listen(nodePort, function(){
  console.log('listening on port', nodePort);
});
