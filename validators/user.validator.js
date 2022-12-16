const Joi = require('joi');

const {statusCodes} = require('../constants');
const {ApiError} = require('../errors');

const emailValidator = Joi.string().regex(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    .lowercase()
    .trim()
    .error(new ApiError('Email not valid', statusCodes.BAD_REQUEST));


module.exports = {
    emailValidator
};