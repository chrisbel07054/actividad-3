const {Schema, model} = require('mongoose')

const ModalidadSchema = Schema({
    nombre:{
        type: String,
        required:true,
    },
    categorias:{
        type:Array,
        default:[]
    },
    
})

module.exports = model('Modalidad', ModalidadSchema)