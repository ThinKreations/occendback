const User = require('../models/User');
const Etiqueta = require('../models/Etiquetas');
const Cliente = require('../models/Cliente')

const agregarCliente = async (req,res) =>{

    let{
        
        nombres,
        paterno,
        materno,
        razonSocial,
        direccion,
        ciudad,
        cp,
        rfc,
        email,
        telefono,
        movil,
        usuario_creo
    } = req.body;

    guardarEtiquetasBD(
        nombres, 
        paterno,
        materno,
        razonSocial,
        direccion,
        ciudad,
        cp,
        rfc,
        email,
        telefono,
        movil);

        const Cliente = new Cliente({
            
            nombres,
            paterno,
            materno,
            razonSocial,
            direccion,
            ciudad,
            cp,
            correo,
            telefono,
            movil,
            datos_creacion: { usuario_creo },
        });
    
        const clienteAgregado = await ficha.save();
    
        res.json({
            msg: 'Cliente agregado correctamente',
            clienteAgregado
        });
    
}

const guardarEtiquetasBD = async (etiquetas,
    nombres,
    paterno,
    materno,
    razonSocial,
    direccion,
    ciudad,
    cp,
    correo,
    telefono,
    movil) => {

    let etiquetaFor;
    let existenciaEtiqueta;
    etiquetas.push(nombres);
    etiquetas.push(paterno);
    etiquetas.push(materno);
    etiquetas.push(razonSocial);
    etiquetas.push(direccion);
    etiquetas.push(ciudad);
    etiquetas.push(cp);
    etiquetas.push(correo);
    etiquetas.push(telefono);
    etiquetas.push(movil);
    etiquetas.forEach(async e => {

        //Verifica la existencia de la etiqueta
        existenciaEtiqueta = await Etiqueta.findOne({ etiqueta: e });
        //Si las etiquetas no estan registradas previamente se agrega
        if (!existenciaEtiqueta) {
            etiquetaFor = new Etiqueta({ etiqueta: e });
            await etiquetaFor.save();
        }

    });

    return etiquetas;

}

const traerClientes = async (req,res) =>{
    
        
        const [total, clientes] = await Promise.all([
            Cliente.countDocuments({ "estado_cliente.state": true }),
            Cliente.find({ "estado_cliente.state": true }).skip(0).skip(10)
        ])
    
        res.json({
            total,
            clientes
        });
    
}

const getClienteId = async (req, res) => {

    const { id } = req.params;
    const cliente = await Ficha.findById(id).populate("comentarios.id_usuario");

    res.json({
        cliente
    })

}

const eliminarCliente = async (req, res) => {

    const { id } = req.params;
    await Cliente.findByIdAndDelete(id);

    res.json({
        msg: 'Cliente borrado.'
    });

}




module.exports = {
    agregarCliente,
    eliminarCliente,
    traerClientes,
    getClienteId,
    guardarEtiquetasBD
}
