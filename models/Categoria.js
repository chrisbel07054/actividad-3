const {Schema, model} = require('mongoose')

const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required:true,
    },
    premio:{
        type: Number,
        required:true,
    }
})

module.exports = model('Categoria', CategoriaSchema)