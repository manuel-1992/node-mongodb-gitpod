const {Schema, model} = require('mongoose');

const tareaSchema = new Schema({

    tarea:{type:String, required:true},
    descripcion:{type:String, required:true}
});

module.exports = model('tarea', tareaSchema);