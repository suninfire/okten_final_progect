const Joi = require('joi');

const {statusCodes} = require('../constants');
const {ApiError} = require('../errors');



const dateValidator = Joi.string()
    .lowercase()
    .regex(/(#+[а-яіїї0-9(_)]{1,})/)
    .error(new ApiError('tag not valid', statusCodes.BAD_REQUEST));

const timeValidator = Joi.string()
    .regex(/([01]?[0-9]|2[0-3]):[0-5][0-9]/)
    .error(new ApiError('Time not valid', statusCodes.BAD_REQUEST));


const newDrinkerValidator = Joi.object({
   date: dateValidator.required(),
   time: timeValidator.required(),
   description: Joi.string().required(),
   criteria: Joi.string().required()
});

const updateDrinkerValidator = Joi.object({
    date: dateValidator,
    time: timeValidator,
    description: Joi.string(),
    criteria: Joi.string()
});


module.exports = {
    newDrinkerValidator,
    updateDrinkerValidator
};