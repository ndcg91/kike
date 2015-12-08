var express             = require('express');
var app                 = express();
var bodyParser          = require('body-parser');
var mongoose            = require('mongoose');
var jwt                 = require('jsonwebtoken');
var morgan              = require('morgan');
var Trabajador		= require('./modules/trabajadores.js');
var Nomina		= require('./modules/nomina.js');
var Contrato            = require('./modules/contrato.js');
var Parameter		= require('./modules/parameters.js');
mongoose.connect('mongodb://kike:TemporaL1718@127.0.0.1:27017/kike');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers,X-Requested-With, Content-Type, Accept');
    next();
});


var port = process.env.PORT || 8080;


var router = express.Router();

router.use(function(req, res, next) {
//res.header('Access-Control-Allow-Origin', 'http://128.199.62.16');
//res.header('Access-Control-Allow-Methods', 'GET, POST');
//res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Access-Control-Allow-Origin, Acc$
console.log("algo ha pasado");
next();
});

router.get('/', function(req, res) {
        res.json({message: 'ok api set'});
});

router.route('/trabajadores/setParams')
	.post(function(req,res){
		var params = req.body.params
		var newParam = new Parameter();
		newParam.parameters = req.body.params
		newParam.save(function(err,savedParams){
			if (err) res.send(err);
			res.send({message:"parameters updated"});
		})
	});


router.route('/trabajadores/getParams')
        .get(function(req,res){
                Parameter.findOne({},function(err,param){
			if (err) res.send(err);
			res.send(param);
		});
        });

router.route('/trabajadores/add')
	.post(function(req,res){
		var param = "";
		var trabajador = new Trabajador();
		trabajador.trabajador = req.body.trabajador;
		trabajador.save(function(err,trabajador){
			if (err) res.send(err);
			res.send(trabajador);
		});
	});

router.route('/trabajadores/get')
        .get(function(req,res){
                Trabajador.find({},function(err,trabajador){
			if (err) res.send(err)
			res.send(trabajador);
		})
        });

app.use('/api',router);
app.listen(port);
console.log("listening on port 8080");
