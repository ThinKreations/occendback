const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    
    password: {
        type: String,
        required: [true, 'Contrasena requerida']
    },
    
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'UNVERIFIED'
    },
    state: {
        type: Boolean,
        default: true
    },
    
    
});

module.exports = mongoose.model('User', UserSchema);