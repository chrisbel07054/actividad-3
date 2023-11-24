const {Schema, model} = require('mongoose')

const EquipoSchema = Schema({
    nombre:{
       type:String,
       required:true
    },
    participantes:{
        type: Array,
        default:[],
        required:true,
    },
    categoria:{
        type: Array,
        default:[],
        required:true,
    }
})

module.exports = model('Equipo', EquipoSchema)