const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.CORREO_EMPRESA,
        pass: process.env.PASS_EMPRESA
    }
});

const sendEmail = async (email, subject, html) => {
    try {

        await transporter.sendMail({
            from: `Tucan's Software <${process.env.CORREO_EMPRESA}>`,
            to: email,
            subject,
            text: `Correo de verificacion al crear cuenta en Plantmatica`,
            html
        });

    } catch (error) {
        console.log('No va bien - Email', error);
    }
}

module.exports = {
    sendEmail
}