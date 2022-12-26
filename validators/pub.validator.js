const Joi = require('joi');

const {statusCodes} = require('../constants');
const {ApiError} = require('../errors');
const {phoneValidator} = require('./user.validator');


const nameValidator = Joi.string()
    .min(2)
    .error(new ApiError('Pub name not valid', statusCodes.BAD_REQUEST));


const locationValidator = Joi.string();

const timeValidator = Joi.string()
    .regex(/([01]?[0-9]|2[0-3]):[0-5][0-9]/)
    .error(new ApiError('Time not valid', statusCodes.BAD_REQUEST));

const tagValidator = Joi.string()
    .lowercase()
    .regex(/(#+[а-яіїї0-9(_)]{1,})/)
    .error(new ApiError('tag not valid', statusCodes.BAD_REQUEST));

const newPubValidator = Joi.object({
    name: nameValidator.required(),
    contacts: phoneValidator.required(),
    photo: Joi.string().required(),
    location: locationValidator.required(),
    openTime : timeValidator.required(),
    closeTime : timeValidator.required(),
    tags: tagValidator.required(),
    averageCheck: Joi.number().required()
});

const updatePubValidator = Joi.object({
    name: nameValidator,
    contacts: phoneValidator,
    photo: Joi.string(),
    location: locationValidator,
    openTime : timeValidator,
    closeTime : timeValidator,
    tags: tagValidator,
    averageCheck: Joi.number()
});


module.exports = {
    newPubValidator,
    updatePubValidator
};