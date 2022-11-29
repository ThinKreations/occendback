const Producto = require('../models/Producto');
const { guardarEtiquetasBD } = require('./ficha');
const Promotor = require("../models/Promotor");
const Comentario = require("../models/ComentarioProducto");
const User = require("../models/User");

const traerUnProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate("referencia_promotor", ["nombre_publico", "razon_social"])
        .populate("disponibilidad_sucursales", "direccion");

    res.json({
        producto
    })
}

const agregarProductoPromotor = async (req, res) => {

    const {
        referencia_promotor,
        nombre,
        descripcion,
        costo_fisico,
        advertencias,
        etiquetas,
        disponibilidad_sucursales
    } = req.body;

    guardarEtiquetasBD(etiquetas, nombre, 'producto');

    const producto = new Producto({
        referencia_promotor,
        nombre,
        descripcion,
        costo_fisico,
        advertencias,
        etiquetas,
        disponibilidad_sucursales
    });

    const { _id } = await producto.save();

    res.status(200).json({
        msg: 'Se agrego producto con exito',
        _id
    });

}

const getProductosUnPromotor = async (req, res) => {

    const { referencia_promotor } = req.params;

    const productos = await Producto.find({ referencia_promotor }).populate("disponibilidad_sucursales", "direccion");

    res.status(200).json({
        productos
    })

}

const traerTodosProductos = async (req, res) => {

    const productos = await Producto.find({ estado_aprobado: true })
        .populate("referencia_promotor", "nombre_publico")
        .skip(0)
        .limit(30);

    res.status(200).json({
        productos
    })


}

/*Comentarios de los productos  */
const conseguirComentariosProducto = async (req, res) => {

    /* 'id' del producto a comentar */
    const { id } = req.params;
    const { comentario, id_user } = req.body;

    const comentarioModel = new Comentario({
        ref_user: id_user,
        ref_obj: id,
        comentario
    });

    await comentarioModel.save();

    res.status(200).json({
        msg: 'Comentario agregado con exito',
    })

}

const agregarComentariosProducto = async (req, res) => {

    /* 'id' del producto a comentar */
    const { id } = req.params;
    const { comentario, id_user } = req.body;

    const comentarioModel = new Comentario({
        ref_user: id_user,
        ref_obj: id,
        comentario
    });

    await comentarioModel.save();

    res.status(200).json({
        msg: 'Comentario agregado con exito',
    })

}

const eliminarComentarioProducto = async (req, res) => {

    const { id } = req.params;

    await Comentario.findByIdAndDelete(id);
    res.status(200).json({
        msg: 'Se elimino el comentario correctamente.'
    })

}

const getComentariosProducto = async (req, res) => {

    /* 'id' del producto */
    const { id } = req.params;
    const comentarios = await Comentario.find({ ref_obj: id }).populate("ref_user", ["username", "imagen"]);

    res.json({
        comentarios
    })

}

module.exports = {
    agregarProductoPromotor,
    getProductosUnPromotor,
    traerTodosProductos,
    agregarComentariosProducto,
    getComentariosProducto,
    eliminarComentarioProducto,
    traerUnProducto,
    conseguirComentariosProducto
}
