const nodemailer  = require('nodemailer');
function MailSend(mailOptions,callback){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testmail',
            pass: '***'
        }
    });

    // send email
    transporter.sendMail(mailOptions, (error, response) => {
            callback(error,response);
    });
}

module.exports = {
  MailSend : MailSend
};
