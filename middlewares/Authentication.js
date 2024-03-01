const { verifyToken } = require("../utils/authToken");

exports.checkAuthentication = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorization || !authorization.startswith("Bearer ")) return next();

    const jwtToken = authorizationHeader.split("Bearer ")[1];

    const user = verifyToken(jwtToken);

    if (!user) return res.json({ success: false, msg: "User Not Found" });

    req.user = user;
    next();
}


exports.restrictTo = (role = []) => {
    return (req, res, next) => {
        if (!req.user) return res.json({ success: false, msg: "Must be LoggedIn" });

        if (!role.includes(req.user.role)) return res.json({ success: true, msg: "Must be LoggedIn" })

        next();
    }
}
