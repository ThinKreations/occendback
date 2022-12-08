const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            msg: 'Su sesion a expirado.'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
        req.uid = uid;

        const user = await User.findOne({ code: uid });

        //Usuario no existe ->>>
        if (!user) {
            return res.status(401).json({
                msg: "Debe iniciar sesion para acceder."
            });
        }

        //Verificar si el usuario esta activo
        if (!user.state) {
            return res.status(401).json({
                msg: "Token no valido - Usuario no activo"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Su sesion a expirado. - Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}