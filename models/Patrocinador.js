const {Schema, model} = require('mongoose')

const PatrocinadorSchema = Schema({
    nombreComercial:{
        type: String,
        required:true,
    },
    personaContacto:{
        type: String,
        required:true,
    },
    telefono:{
        type: String,
        required:true,
    },
    patrocinio:{
        type: String,
        required:true,
    },
    comentario:{
        type: String,
    },
    
})

module.exports = model('Patrocinador', PatrocinadorSchema)