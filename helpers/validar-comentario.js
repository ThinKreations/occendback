const ComentarioProducto = require('../models/ComentarioProducto');

const existeComentarioProductoId = async (id) => {

    const comentario = await ComentarioProducto.findById(id);
    if(!comentario){
        throw new Error(`No existe un comentario con el ID: ${id}`)
    };

}

module.exports = {
    existeComentarioProductoId
}