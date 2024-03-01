const jwt = require('jsonwebtoken')

// return jwt-token with Algorithm + (id,email,role) Payload + Signature
exports.signToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.SECRET
    );
}

// return Payload Object which created above 
exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET);
}