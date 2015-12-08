var mongoose    =require('mongoose');
var Schema      =mongoose.Schema;

var ContratoSchema =new Schema({
        trabajador:Array,
       	activo:String,
});

module.exports = mongoose.model('Contrato',ContratoSchema);


