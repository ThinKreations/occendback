//Modulo de usuario normal
const { Router } = require('express');
const { check } = require('express-validator');
//Controladores
const { crearCuenta, getUsuario} = require('../controllers/user');
const { existEmail, existeUserID } = require('../helpers/validar-datos-user');
const { validarDatos } = require('../middlewares/validar');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


//Crear cuenta de usuario
router.post('/', [
    
    check('correo', 'Formato de correo no valido').isEmail().custom(existEmail),
    check('password', 'La contraseña debe ser minimo de 10 caracteres').isLength({ min: 10 }),
    
    validarDatos
], crearCuenta);
/*
Confirmar la creacion de la cuenta 
router.get('/confirmar/:create/:token', [
    validarDatos
], confirmarCrearCuenta);
*/
//Conseguir informacion de un usuario
router.get('/:id', [
    validarJWT,
    check('id', 'Ocurrio un error').isMongoId(),
    check('id', 'Ocurrio un error').custom(existeUserID),
    validarDatos
], getUsuario);


/*
//Borrar cuenta usuario
router.delete('/:id', [
    validarJWT,
    check('id', 'Ocurrio un error').isMongoId(),
    check('id', 'Ocurrio un error').custom(existeUserID),
    validarDatos
], deleteUsuario);

//No actualiza edad
router.put('/:id', [
    validarJWT,
    check('id', 'Ocurrio un error').isMongoId(),
    check('id', 'Ocurrio un error').custom(existeUserID),
    check('password', 'Es obligatorio introducir la contraseña').notEmpty(),
    check('sexo', 'Dato no valido').custom(validS),
    check('edad', 'Edad no valida').isInt(),
    check('estadoMx', 'Estado de residencia no valido').custom(validResidencia),
    validarDatos
], actualizarDatosUsuario );

// Mandar el correo para cambiar la contrsena
router.post('/request-password-change', [
    check('correo', 'Formato de correo no valido').isEmail(),
    validarDatos
], reqChangePass);

//Cambiar contrasena 
//no se valida que en la peticion tenga un token
//Esta peticion solo debe ser llamada desde el frontend
router.put('/change-password/:token', [
    check('password', 'Es obligatorio introducir la contraseña').notEmpty(),
    check('password', 'La contraseña debe ser de de 6 a 15 caracteres').isLength({ min: 6, max: 15 }),
    validarDatos
], cambiarContrasena);

*/
module.exports = router;