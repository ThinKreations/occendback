const Promotor = require('../models/Promotor');

const existePromotorID = async (id) => {

    const promotor = await Promotor.findById(id);
    if(!promotor){
        throw new Error(`No existe un promotor con ese ID`)
    }

}

const existeCorreoPromotor = async (correo_comercial) => {

    const promotor = await Promotor.findOne({ correo_empresa: correo_comercial });
    if(promotor){
        throw new Error(`Ya existe un promotor registrado con el correo: ${correo_comercial}`)
    }

}

module.exports = {
    existePromotorID,
    existeCorreoPromotor
}