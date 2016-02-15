var mongoose    =require('mongoose');
var Schema      =mongoose.Schema;

var TrabajadorSchema =new Schema({
        trabajador:Object
});

module.exports = mongoose.model('Trabajador',TrabajadorSchema);


