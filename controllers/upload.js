const { response } = require("express");
const cloudinary = require('cloudinary').v2;
const Usuario = require('../models/User');
const FichaPlanta = require('../models/FichaPlanta');
const Promotor = require('../models/Promotor');
const Producto = require('../models/Producto');

cloudinary.config(process.env.CLOUDINARY_URL);

const actualizarImg = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un usuario con ese ID'
                });
            }
            break;
        case 'fichas':
            modelo = await FichaPlanta.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe una ficha con ese ID'
                });
            }
            break;

        case 'promotores':
            modelo = await Promotor.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un promotor con ese ID'
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un producto con ese ID'
                });
            }
            break
        default:
            return res.status(400).json({
                ok: false,
                msg: 'JAJAJAJ error'
            });
    }

    //res.json({id, coleccion});

    if (modelo.imagen) {
        const nombreArr = modelo.imagen.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        await cloudinary.uploader.destroy(public_id);
    }

    //res.json(req.files.archivo);


    const { tempFilePath } = req.files.archivo;
    //res.json({imagen : imagen});
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    //res.json({secure_url : secure_url});
    //res.json({
    //    imagen
    //});
    modelo.imagen = secure_url;
    await modelo.save();

    res.json({
        msg: 'Imagen actualizada'
    })

}

const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'users':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un usuario con ese ID'
                });
            }
            break;
        case 'fichas':
            modelo = await FichaPlanta.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe una ficha con ese ID'
                });
            }
            break;

        case 'promotores':
            modelo = await Promotor.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un promotor con ese ID'
                });
            }
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'JAJAJAJ error'
            });
    }

    res.json(modelo.imagen);

}

module.exports = {
    actualizarImg,
    mostrarImagen
}
