const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generarJWT, generarJWTPass } = require('../config/jwt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const crearCuenta = async (req, res) => {

    try {
        const {correo, password} = req.body;

        //generar codigo
        const code = uuidv4();
        const user = new User({correo, password, code });

        /* Generar webToken */
        const token = await generarJWT(code);



        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        const userSave = await user.save();

        res.json({
            msg: 'Se creo la cuenta de manera exitoso',
            userSave
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'Error al registrar usuario'
        });
    }
}

const getUsuario = async (req, res) => {

    const { id } = req.params;
    const usuario = await User.findById(id);

    res.json({
        usuario
    });

}

module.exports = {
    crearCuenta,
    getUsuario,
    
}