const Etiqueta = require('../models/Etiquetas');
const Cliente = require('../models/Cliente');

//Recibir un array desde la peticion del usuario (req.body)
const validarEtiquetas = (etiquetas) => {

    if (etiquetas.length < 1) {
        throw new Error(`Debe tener al menos una etiquetas.`);
    }

    
}

//Verifica que una ficha exista y que ya haya sido aceptada por algun administrador
const existeClienteId = async (id) => {

    const existe = await Cliente.findById(id);
    if (!existe) {
        throw new Error(`No existe alguna ficha con el id: ${id}`)
    } else {
        if (!existe.estadoCliente.state) {
            throw new Error(`La ficha existe . Operacion invalida`)
        }
    }

}


module.exports = {
    validarEtiquetas,
    
    existeClienteId,
    
    
}