var mongoose    =require('mongoose');
var Schema      =mongoose.Schema;

var ParameterSchema =new Schema({
        parameters:Array
});

module.exports = mongoose.model('Parameters',ParameterSchema);


