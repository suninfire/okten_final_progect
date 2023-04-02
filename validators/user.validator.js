const Joi = require('joi');

const {statusCodes} = require('../constants');
const {ApiError} = require('../errors');

const pubIdValidator = Joi.string()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/)
        .error(new ApiError('Pub Id not valid', statusCodes.BAD_REQUEST));

const emailValidator = Joi.string()
    .regex(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    .lowercase()
    .trim()
    .error(new ApiError('Email not valid', statusCodes.BAD_REQUEST));

const passwordValidator = Joi.string()
    .min(8)
    .max(20)
    // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
    .error(new ApiError('Password not valid', statusCodes.BAD_REQUEST));

const nameValidator = Joi.string().alphanum()
    .min(2)
    .max(35)
    .trim()
    .error(new ApiError('Name not valid', statusCodes.BAD_REQUEST));


const phoneValidator = Joi.string()
    .min(13)
    .trim()
    .regex( /((\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/)
    .error(new ApiError('Phone not valid,example:+380970000000', statusCodes.BAD_REQUEST));


const newUserValidator = Joi.object({
    username: nameValidator.required(),
    // photo: Joi.string(),
    email: emailValidator.required(),
    password: passwordValidator.required(),

});

const updateUserValidator = Joi.object({
    username: nameValidator,
    photo: Joi.string(),
    email: emailValidator,
    adminPhone: phoneValidator,
    pub: Joi.array().items(pubIdValidator),
    administrator: Joi.boolean()
});

const loginUserValidator = Joi.object({
    email: emailValidator.required().error(new ApiError('Wrong email or password', statusCodes.BAD_REQUEST)),
    password: passwordValidator.required().error(new ApiError('Wrong email or password', statusCodes.BAD_REQUEST)) ,
});

module.exports = {
    newUserValidator,
    updateUserValidator,
    loginUserValidator,
    phoneValidator,
};