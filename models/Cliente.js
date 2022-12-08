let fechaSch = new Date();
const mongoose = require('mongoose');

const SchemaCliente = mongoose.Schema({

    nombres:{
        type:String,
        required: false,
        unique: false
    },
    paterno:{
        type:String,
        required: false,
        unique: false
    },
    materno:{
        type:String,
        required: false,
        unique: false
    },
    razonSocial:{
        type:String,
        required:false,
        unique:false
    },
    direccion:{
        type:String,
        required: false,
        unique: false
    },
    ciudad:{
        type:String,
        required: true,
        unique: false
    },
    cp:{
        type:String,
    },
    rfc:{
        type:String,
        required:false,
        unique:false
    },
    email:{
        type:String,
        required:false
    },
    telefono:{
        type:Number
    },
    movil:{
        type:Number
    },
    datos_creacion:{
        fecha: {
            dia: {
                type: Date,
                default: fechaSch.getDay()
            },
            mes: {
                type: Date,
                default: fechaSch.getMonth()
            },
            year: {
                type: Date,
                default: fechaSch.getFullYear()
            }
        },
        usuario_creo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },   
    estado_Cliente: {
        state: {
            type: Boolean,
            default: false
        }
    },

})

module.exports = mongoose.model('Cliente', SchemaCliente);