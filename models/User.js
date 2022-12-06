const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true]
    },
    
});

module.exports = mongoose.model('User', UserSchema);

