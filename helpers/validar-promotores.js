const Promotor = require('../models/Promotor');

/* Inicialmente solo se usara para validar si existe una solicitud con dicho ID */
const existePromoID = async(id_promo) => {

    const promotor = await Promotor.findById(id_promo);
    if(!promotor){
        throw new Error(`No existe un promotor con el ID: ${id_promo}`);
    }

}

module.exports = {
    existePromoID
}