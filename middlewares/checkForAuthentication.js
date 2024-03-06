const { verifyUserToken } = require("../utils/authenticationToken");
const ExpressError = require("./ApiError");

exports.checkForUserAuthentication = (req, res, next) => {

    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        req.user = null;
        return next();
    }

    const jwtToken = authorizationHeader.split("Bearer ")[1];

    try {
        const user = verifyUserToken(jwtToken);
        req.user = user;
    } catch (err) {
        res.json({
            success: false,
            error: err.message,
        })
    }
    next();
}


exports.restrictTo = (role = []) => {
    return (req, res, next) => {

        if (!req.user) return next(new ExpressError(401, "Unauthorized ! Please First Login"));

        if (!req.user.is_verify) return next(new ExpressError(400, "Please Verify you Mail"));

        if (!role.includes(req.user.role)) return next(new ExpressError(400, "Role Must be Present"));

        next();
    }
}