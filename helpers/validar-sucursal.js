const Sucursal = require('../models/Sucursales')

const existeSucursal = async (direccion) => {
    const sucursal = await Sucursal.findOne({ direccion });
    if(sucursal){
        throw new Error(`Ya se registro una sucursal en esa dirección.`)
    }

}

module.exports = {
    existeSucursal
}