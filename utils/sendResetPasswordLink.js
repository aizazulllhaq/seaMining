const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/userModel');
const nodemailer = require('nodemailer');

const generatRandomToken = () => uuidv4();

exports.sendResetPasswordLink = async (userName, userEmail, userID) => {
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

    const user = await User.findById(userID);
    user.rp_token.push(randomToken)

    await user.save();

    const mailOptions = {
        from: process.env.Email,
        to: userEmail,
        subject: "Reset Password Mail",
        html: `Hey ${userName} please <a href="${process.env.SERVER_URL}/api/users/changePassword?id=${userID}&expiry=${expiryTimestamp}&rp_token=${randomToken}">Reset your Password</a> to Continue`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return console.log(err)

        return console.log("Email has been Send : ", info.response)
    })

}