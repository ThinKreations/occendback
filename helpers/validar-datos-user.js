const User = require('../models/User');
//VARIABLE PARA USAR NODEMAILER

const existUserID = async (id) => {

    const usuario = await User.findById(id);
    if (!usuario) {
        throw new Error(`Usuario no existe `);
    }

}


module.exports = {
    
    existUserID,


}