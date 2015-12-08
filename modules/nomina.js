var mongoose    =require('mongoose');
var Schema      =mongoose.Schema;

var NominaSchema =new Schema({
        trabajador:Array,
       	activo:String,
});

module.exports = mongoose.model('Nomina',NominaSchema);


