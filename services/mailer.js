const nodemailer = require('nodemailer');

function send(to, subject, text) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to,
            subject,
            text
        };

        transporter.sendMail(mailOptions, (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

}

module.exports = {
    send
};