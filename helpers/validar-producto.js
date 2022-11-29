const Producto = require("../models/Producto");

const existeProductoID = async (id) => {

    const existe = await Producto.findById(id);
    if (!existe) {
        throw new Error(`No existe algun PRODUCTO con el id: ${id}`)
    } else {
        if (existe.estado_aprobado === false) {
            throw new Error(`El producto existe, pero no ha sido aceptada. - Operacion invalida`)
        }    }
}

module.exports = {
    existeProductoID
}