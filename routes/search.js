const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { buscarCoincidencias, buscarFichasCoincidencias } = require('../controllers/search');
const { buscarProductoTermino, buscarProductosCoincidencias } = require('../controllers/search');
const { validarDatos } = require('../middlewares/validar');

/* Paranetros de busqueda */
/* Buscar fichasa relacionadas */
router.put('/ficha/coincidencias/', buscarFichasCoincidencias)

/* Buscar productos por terminos */
router.put('/buscar/:termino', buscarProductoTermino);

/* Buscar productos relacionados */
router.put('/producto/coincidencias/', buscarProductosCoincidencias);

router.get('/prueba-buscar', (req, res) => { res.json({ msg: 'funcionando' }) });

module.exports = router;
