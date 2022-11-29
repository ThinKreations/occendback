const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { buscarCoincidencias, buscarClientesCoincidencias } = require('../controllers/search');

const { validarDatos } = require('../middlewares/validar');

/* Paranetros de busqueda */
/* Buscar fichasa relacionadas */
router.put('/ficha/coincidencias/', buscarClientesCoincidencias)

router.get('/prueba-buscar', (req, res) => { res.json({ msg: 'funcionando' }) });

module.exports = router;
