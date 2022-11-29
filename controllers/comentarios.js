const { existeComentarioID, verificarUsuario } = require('../helpers/validar-comentario');
const Ficha = require('../models/FichaPlanta');
const User = require('../models/User');

const comentarFicha = async (req, res) => {

    const { id } = req.params;
    const { comentario, id_user } = req.body;

    await Ficha.findByIdAndUpdate(id, {
        $push: {
            'comentarios': {
                'id_usuario': id_user,
                'comentario': comentario
            }
        }
    });

    res.json({
        msg: 'Se ha comentado con exito.'
    })

}

const editarComentario = async (req, res) => {

    const { id } = req.params;
    const { id_comentario, id_user, comentario } = req.body;
    await Ficha.updateOne({
        comentarios: {
            _id: id_comentario
        }
    }, comentario);

    res.json({
        msg: 'Comentario actualizado con exito'
    });


}

const borrarComentario = async (req, res) => {

    const { id } = req.params;
    const { id_comentario, id_user } = req.body;
    /* Verifica la existencia del comentario */

    await Ficha.findByIdAndUpdate(id, {
        $pull: {
            'comentarios': {
                "_id": id_comentario
            }
        }
    });

    res.json({
        msg: "Se borro el comentario con exito"
    });


}

/* NO FUNCIONA */
const reportComentario = async (req, res) => {

    const { id } = req.params;
    const { id_comentario } = req.body;


    /* no usar set jaja */
    //const comentario = await Ficha.findOneAndUpdate({ _id: id, "comentarios._id": id_comentario }, );

    /*
    let comentario = await comentarios.filter(coment => coment._id == id_comentario );
    let noseayudadiosito;
    comentario.forEach(c => {
        noseayudadiosito = c.numero_reportes
    });
    let numero_reportes = noseayudadiosito + 1; */
    await Ficha.updateOne({ comentarios: { _id: id_comentario } }, { $inc: { "numero_reportes": 1 } });
    const ficha = await Ficha.findById(id);
    const comentarios = await ficha.comentarios;

    res.json({
        msg: 'Comentario reportado con exito',
        comentarios
    });

}

module.exports = {
    comentarFicha,
    editarComentario,
    borrarComentario,
    reportComentario
}