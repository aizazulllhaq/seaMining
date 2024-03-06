const jwt = require("jsonwebtoken")


exports.createTokenForUser = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    }

    // Attach additional fields
    payload.profileImage = user.profileImage;
    payload.is_verify = user.is_verify;
    
    // console.log("from token creation ", payload)

    const token = jwt.sign(payload, process.env.SECRET)
    return token;
}

exports.verifyUserToken = (token) => {
    const payload = jwt.verify(token, process.env.SECRET);
    return payload;
}