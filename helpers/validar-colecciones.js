const coleccionesPermitidas = (coleccion='', colecciones=[]) => {
    const incluida = colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`La colección ${coleccion} no está permitida, ${colecciones}`);
    }

    return true;
}
module.exports = {
    coleccionesPermitidas
};