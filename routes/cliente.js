const { Router } = require('express');
const { check } = require('express-validator');
const { agregarCliente, eliminarCliente, getClienteId, traerClientes} = require('../controllers/cliente');
const { getEtiquetas, buscarCoincidencias, buscarClientesCoincidencias } = require('../controllers/search');
const { existeUserID } = require('../helpers/validar-datos-user');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarDatos } = require('../middlewares/validar')  
const { existeClienteId } = require('../helpers/validar-cliente')


const router = Router();



router.post('/', [
    
    validarJWT,

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
    check('id_user', 'Operación invalida.').isMongoId().custom(existeUserID),

    validarDatos
], agregarCliente);

//Obtener un cliente por su id
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId().custom(existeClienteId),
    validarDatos
], getClienteId);

router.get('/', traerClientes,


);


router.delete('/delete/cliente/:id', [
    validarJWT,
    check('id').isMongoId(),
    validarDatos
], eliminarCliente);

router.get('/buscar/etiquetas', getEtiquetas)

router.get('/coincidencias/:coincidencias', buscarClientesCoincidencias)

router.put('/encontrar/coincidencia',[
    check('termino', 'EL término de búsqueda no puede ir vacío').notEmpty(),
    validarDatos
], buscarCoincidencias)


module.exports = router; 
