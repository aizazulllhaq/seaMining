const Joi = require('joi');
const ExpressError = require('../middlewares/ApiError');

exports.usersSchemaValidation = Joi.object({
    fullname: Joi.string().required().lowercase(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    password: Joi.string().required().min(6).max(30),
    phoneNumber: Joi.number(),
    address: Joi.string().lowercase(),
    profileImage: Joi.string(),
})




exports.isUserSchemaValidate = (req, res, next) => {
    const { error } = this.usersSchemaValidation.validate(req.body);
    if (error) {
        throw new ExpressError(404, error.message);
    } else {
        next();
    }
}
