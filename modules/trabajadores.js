var mongoose    =require('mongoose');
var Schema      =mongoose.Schema;

var TrabajadorSchema =new Schema({
        trabajador:Array,
       	activo:String,
});

module.exports = mongoose.model('Trabajador',TrabajadorSchema);


