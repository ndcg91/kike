var mongoose    =require('mongoose');
var Schema      =mongoose.Schema;

var ParameterSchema =new Schema({
        value:String,
	type:String
});

module.exports = mongoose.model('Parameters',ParameterSchema);


