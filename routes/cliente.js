const { Router } = require('express');
const { check } = require('express-validator');
const { agregarCliente, eliminarCliente, getClienteId, guardarEtiquetasBD, traerClientes} = require('../controllers/cliente');
const { getEtiquetas, buscarCoincidencias, buscarClientesCoincidencias } = require('../controllers/search');
const { existeUserID } = require('../helpers/validar-datos-user');
const { validarJWT, validarDatos } = require('../middlewares/validar-jwt');
const { existeFichaId } = require('../helpers/validarFicha')


const router = Router();

router.post('/', [
    validarJWT,

    check('etiquetas'),
    check('nombres', 'No puede ir vacío').notEmpty(),
    check('paterno'),
    check('materno'),
    check('razonSocial'),
    check('direccion'),
    check('ciudad'),
    check('cp'),
    check('rfc'),
    check('email', 'Debe tener correo').notEmpty,
    check('telefono'),
    check('movil'),
    
    validarDatos
], agregarCliente);

//Obtener un cliente por su id
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId().custom(existeFichaId),
    validarDatos
], getFichaId);


module.exports = router; 
