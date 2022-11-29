const Promotor = require('../models/Promotor');
const bcryptjs = require('bcryptjs');
const Producto = require('../models/Producto');

const registrarPromotor = async (req, res) => {

    let {
        nombre_publico,
        razon_social,
        usuario_referencia,
        direccion_comercial,
        telefono_comercial,
        correo_comercial,
        clabe_interbancaria,
        tarjeta_credito,
        rfc
    } = req.body;

    /* Cifrar informacion sensibe del promotor */
    const salt = bcryptjs.genSaltSync();
    clabe_interbancaria = bcryptjs.hashSync(clabe_interbancaria, salt);
    tarjeta_credito = bcryptjs.hashSync(tarjeta_credito, salt);
    rfc = bcryptjs.hashSync(rfc, salt);

    const promotor = new Promotor({
        nombre_publico,
        razon_social,
        usuario_referencia,
        direccion_comercial,
        telefono_comercial,
        correo_empresa: correo_comercial,
        clabe_interbancaria,
        tarjeta_credito_titular_cuenta: tarjeta_credito,
        rfc_empresa_persona_fisica: rfc
    });

    await promotor.save();
    const promo = await Promotor.findByIdAndUpdate(promotor._id, {
        $push: {
            "usuarios_acceso_datos": {
                usuario_referencia
            }
        }
    });

    res.json({
        msg: 'Registro de promotor',
        promo
    });

}

const traerIDPromotor = async (req, res) => {

    const { id_usuario } = req.params;
    let promotor = await Promotor.findOne({ usuario_referencia: id_usuario })
        .populate('usuario_referencia', ["username", "correo", "status"])
        .populate('usuarios_acceso_datos', ["username", "correo", "status"]);;
    if (promotor) {
        return res.status(200).json({
            promotor
        })
    }
    if (!promotor) {
        promotor = await Promotor.findOne({ usuarios_acceso_datos: { $elemMatch: { id_usuario } } })
            .populate('usuario_referencia', ["username", "correo", "status"])
            .populate('usuarios_acceso_datos', ["username", "correo", "status"]);
        return res.status(200).json({
            promotor
        })
    }

}

const traerTodosPromotores = async (req, res) => {

    const [promotores, count] = await Promise.all([
        Promotor.find({ estado_aprobado: false }),
        Promotor.countDocuments({ estado_aprobado: false })
    ])

    res.json({
        promotores,
        count
    })

}

const actualizarPromotor = async (req, res) => {

    const { id } = req.params;
    const {
        nombre_publico,
        razon_social,
        usuario_referencia,
        direccion_comercial,
        telefono_comercial,
        correo_comercial,
        clabe_interbancaria,
        tarjeta_credito,
        rfc
    } = req.body;

    await Promotor.findByIdAndUpdate(id, {
        nombre_publico,
        razon_social,
        usuario_referencia,
        direccion_comercial,
        telefono_comercial,
        correo_comercial,
        clabe_interbancaria,
        tarjeta_credito,
        rfc
    });

    res.status(200).json({
        msg: 'Datos de promotor actualizados correctamente.'
    })

}

module.exports = {
    registrarPromotor,
    traerTodosPromotores,
    traerIDPromotor,
    actualizarPromotor
}