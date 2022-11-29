const Sucursales = require('../models/Sucursales');

const agregarSucursal = async (req, res) => {

    const {
        referencia_promotor,
        direccion,
        telefono,
        marcador_api_mapa,
        horario,
        nombre_sucursal,
        persona_cargo
    } = req.body;

    //se tiene que enviar el horario ya construido en el frontend
    const sucursal = new Sucursales({
        //marcador_api_mapa,
        referencia_promotor,
        direccion,
        telefono,
        horario_atencion: horario,
        nombre_sucursal,
        persona_cargo
    })

    await sucursal.save()

    res.status(200).json({
        msg: 'Se agregó la sucursal con éxito',
        //sucursal
    })

}

/* Obtiene las sucursales de cada promotor por su id */
const getSucursales = async (req, res) => {

    const { referencia_promotor } = req.params;

    const sucursales = await Sucursales.find({ referencia_promotor });
    res.json({
        sucursales
    })

}

module.exports = {
    agregarSucursal,
    getSucursales
}