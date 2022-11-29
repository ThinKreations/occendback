const Etiqueta = require('../models/Etiquetas');
const Cliente = require('../models/Cliente');


const getEtiquetas = async (req, res) => {

    const etiquetas = await Etiqueta.find();
    let arrayEtiquetas = [];
    let object;
    etiquetas.forEach(e => {
        if (e.estadoEti === true) {
            object = new Object({
                etiqueta: e.etiqueta
            });
            arrayEtiquetas.push(object);
        }
    });

    res.json({
        arrayEtiquetas
    });

}

const buscarCoincidencias = async (req, res) => {

    const { termino } = req.body;

    //{ "estado_ficha.state": true }
    const clientes = await Cliente.find({ etiquetas: { $regex: termino, $options: 'i' }, "estado_Cliente.state": true })

    res.json({
        clientes,
        termino
    })

}

const buscarClientesCoincidencias = async (req, res) => {

    const { coincidencia1, coincidencia2, coincidencia3 } = req.body;
    const [cliente_con1, cliente_con2, cliente_con3] = await Promise.all([
        Cliente.find({ etiquetas: { $regex: coincidencia1, $options: 'i' }, "estado_Cliente.state": true })
            .skip(0).limit(5),
        Cliente.find({ etiquetas: { $regex: coincidencia2, $options: 'i' }, "estado_Cliente.state": true })
            .skip(0).limit(5),
        Cliente.find({ etiquetas: { $regex: coincidencia3, $options: 'i' }, "estado_Cliente.state": true })
            .skip(0).limit(5),
    ])

    res.status(200).json({
        cliente_con1, cliente_con2, cliente_con3
    })
}


module.exports = {
    getEtiquetas,
    buscarCoincidencias,
    buscarClientesCoincidencias
    
}

