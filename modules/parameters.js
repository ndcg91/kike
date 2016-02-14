var mongoose    =require('mongoose');
var Schema      =mongoose.Schema;

var ParameterSchema =new Schema({
        parameters:String,
});

module.exports = mongoose.model('Parameters',ParameterSchema);


