
var express             = require('express');
var app                 = express();
var bodyParser          = require('body-parser');
var mongoose   = require('mongoose');
var Worker = require('./modules/trabajadores.js');
var Values = require('./modules/parameters.js');
mongoose.connect('mongodb://kike:TemporaL1718@apollo.modulusmongo.net:27017/h8epehaV');// connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

//GET
router.route('/workers')
	//get all workers
	.get(function(req,res){
		Worker.find(function(err,workers){
			if (err)
				res.send(err);
			res.json(workers)
		})
	});

router.route('/workers/:worker_id')
	//get one worker
	.get(function(req,res){
		Worker.findById(req.params.worker_id, function(err,worker){
			if (err)
				res.send(err);
			res.json(worker)
		})
	});


router.route('/values')
	//get all values
	.get(function(req,res){
		Values.find(function(err,values){
			if (err)
				res.send(err);
			res.json(values[0].parameters)
		})
	});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);




//POST CREATE
router.route('/workers')
	// create a worker (accessed at POST http://localhost:8080/api/worker)
	.post(function(req, res) {
		console.log(req.body.trabajador);
		var worker = new Worker();      // create a new instance of the Bear model
		worker.trabajador = JSON.parse(req.body.trabajador);  // set the bears name (comes from the request)

		// save the bear and check for errors
		worker.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'worker created!' });
		});

	});

router.route('/value')
	// create a value (accessed at POST http://localhost:8080/api/value)
	.post(function(req, res) {
		Values.findOne(function(err,values){
			if (err)
				res.send(err);
			console.log(values);
			if (values == null){
				value = new Values()
				value.parameters=[req.body.value];
				value.save(function(err){
					if (err)
						res.send(err);
					res.json({ message: 'value created!' });
				});
			}
			else{
			values.parameters.push(req.body.value);
			values.save(function(err){
				if (err)
					res.send(err);
				res.json({ message: 'value created!' });
			})
			}
		})
	});

//PUT EDIT
router.route('/workers/:worker_id')
	// create a worker (accessed at POST http://localhost:8080/api/worker)
	.put(function(req, res) {
		Worker.findById(req.params.worker_id, function(err,worker){
			if (err)
				res.send(err);
			worker.trabajador = req.body.trabajador;
			worker.save(function(err){
				if (err)
					res.send(err);
	                        res.json(worker)		
			})
		})

	})
	.delete(function(req, res) {
	Worker.remove({
		_id: req.params.worker_id
	}, function(err, bear) {
		if (err)
			res.send(err);
		res.json({ message: 'Successfully deleted' });
	});
});

//PUT EDIT

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
