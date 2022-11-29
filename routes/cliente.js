const { Router } = require('express');
const { check } = require('express-validator');
const { agregarCliente, eliminarCliente, getClienteId, guardarEtiquetasBD, traerClientes} = require('../controllers/cliente');


const router = Router();



module.exports = router; 
