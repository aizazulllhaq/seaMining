const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const generatRandomToken = () => uuidv4();

exports.sendVerificationMail = (userName, userEmail, userID) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.GMAIL_SMTP_PASS,
        }
    });

    const expiryTimestamp = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // 24 hours from now 
    const randomToken = generatRandomToken(); // generate random token

    const mailOptions = {
        from: process.env.Email,
        to: userEmail,
        subject: "User Verification Mail",
        html: `Hey ${userName} please <a href="${process.env.SERVER_URL}/api/users/verify?id=${userID}&expiry=${expiryTimestamp}&token=${randomToken}">Verify Mail</a> to Continue`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return console.log(err)

        return console.log("Email has been Send : ", info.response)
    })

}