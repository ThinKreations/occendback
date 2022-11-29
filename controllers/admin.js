//Modulos de ficha y usuario (OPERACIONES QUE SOLO PUEDA REALIZAR EL ADMINISTRADOR)
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Ficha = require('../models/FichaPlanta');
const Solicitud = require('../models/SolicitudEdicion');
const Promotor = require('../models/Promotor');
const { sendEmail } = require('../config/mail');
const { getTemplateControlSolPromo } = require('../mails/solicitudPromotor');

const validarAdministrador = async (req, res) => {
    const { token } = req.body;
    const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);
    const admin = await User.findOne({ code: uid });
    res.json({
        admin: true,
        adminID: admin._id
    })
}

/* Una por una y se require el ID */
const manipularSolicitudEdicion = async (req, res) => {

    /* Al aceptar la edicion se borrara de las solicitudes de edicion y pasara a ser la nueva ficha */
    const { id } = req.params;
    const { control } = req.body
    const solicitud = await Solicitud.findById(id);

    if (control == true) {
        await Ficha.findByIdAndUpdate(solicitud.id_referencia_planta, {
            imagenes: solicitud.imagenes,
            etiquetas: solicitud.etiquetas,
            nombre_comun: solicitud.nombre_comun,
            nombre_cientifico: solicitud.nombre_cientifico,
            origen_distribucion: solicitud.origen_distribucion,
            descripcion: solicitud.descripcion,
            caracteristicas_especiales: solicitud.caracteristicas_especiales,
            complemento: solicitud.complemento,
            consumo: solicitud.consumo,
            usos_medicinales: solicitud.usos_medicinales,
            fuentes: solicitud.fuentes
        });

        await Solicitud.findByIdAndDelete(id);

        return res.json({
            msg: 'Solicitud de edicion aceptada'
        });
    } else if (control == false) {
        await Solicitud.findByIdAndDelete(id);

        return res.json({
            msg: 'Solicitud de edicion rechazada'
        });
    }


}

/* Conseguir solicitudes (TODAS) */
const getSolicitudes = async (req, res) => {

    const [total, solicitudes] = await Promise.all([
        Solicitud.countDocuments(),
        Solicitud.find()
    ]);

    res.json({
        total,
        solicitudes
    });

}

//Aceptar solicitud de agregar ficha (SI JALA)
const manipularSolicitudAgregar = async (req, res) => {

    const { idAdmin, control } = req.body;
    const { id } = req.params;

    const igual = await Ficha.findById(id);

    /* No se permite que un administrador acepte su propia ficha */
    if (control == true) {

        if (igual.datos_creacion.usuario_creo == idAdmin) {

            return res.status(400).json({
                msg: 'Un administrador no puede aceptar la misma ficha que creo'
            });

        } else {

            await Ficha.findByIdAndUpdate(id, {
                estado_ficha: {
                    state: control,
                    admin_acepto: idAdmin
                },
            });

            return res.json({
                msg: `La ficha a sido aceptada`
            });

        }

    }

    if (control == false) {
        await Ficha.findByIdAndDelete(id);

        return res.json({
            msg: 'La ficha ha sido rechazada'
        });
    }

}

//Conseguir las fichas no aceptadas 
const fichasPromotoresNoAceptadas = async (req, res) => {

    const { token } = req.params;

    if (!token) {
        return res.status(400).json({
            msg: 'Vuelva a iniciar sesion'
        });
    }

    const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);

    const usuario = await User.findOne({ code: uid });
    //Validar token
    try {

        //Usuario no existe ->>>
        if (!usuario) {
            return res.status(401).json({
                msg: "Debe iniciar sesion para realizar esta operacion."
            });
        }

        //Verificar si el usuario esta activo
        if (!usuario.state) {
            return res.status(401).json({
                msg: "Token no valido - Usuario no activo"
            });
        }

    } catch (error) {
        return res.status(401).json({
            msg: 'Su sesion a expirado. - Token no valido'
        })
    }

    if (usuario.rol === 'Administrador') {
        const [total, fichas, solPromo, solFichas] = await Promise.all([
            Ficha.countDocuments({ "estado_ficha.state": false }),
            Ficha.find({ "estado_ficha.state": false }).populate("datos_creacion.usuario_creo", 'username'),
            Promotor.find({ "estado_aprobado": false }).populate("usuario_referencia", ["username", "correo", "status"]),
            Solicitud.find({ "estado_ficha.state": false }).populate("datos_edicion.usuario_edicion", 'username')
        ]);

        return res.json({
            fichas,
            total,
            solPromo,
            solFichas
        });
    } else {
        return res.status(400).json({
            msg: 'Usuario no Administrador '
        })
    }



}

const eliminarFichaDefinitivamente = async (req, res) => {

    const { id } = req.params;
    await Ficha.findByIdAndDelete(id);

    res.json({
        msg: 'Se ha borrado la ficha definitivamente.'
    });

}

const controlSolicitudPromotor = async (req, res) => {

    const { control } = req.params;
    const { id_promo } = req.body;

    const promotor = await Promotor.findById(id_promo);

    if (control === 'delete') {

        const template = getTemplateControlSolPromo(control, promotor.nombre_publico)
        await sendEmail(promotor.correo_empresa, 'Solcitud a programa de promotor', template)
        await Promotor.findByIdAndDelete(id_promo);

        return res.status(200).json({
            msg: 'Se elimino la solicitud a promotor con exito.'
        });

    } else {

        const template = getTemplateControlSolPromo(control, promotor.nombre_publico)
        await sendEmail(promotor.correo_empresa, 'Solcitud a programa de promotor', template)

        await Promotor.findByIdAndUpdate(id_promo, {
            estado_aprobado: control
        });

        return res.status(200).json({
            msg: `Operación exitosa.`
        });
    }

}

module.exports = {
    fichasPromotoresNoAceptadas,
    manipularSolicitudAgregar,
    manipularSolicitudEdicion,
    getSolicitudes,
    eliminarFichaDefinitivamente,
    validarAdministrador,
    controlSolicitudPromotor
}
