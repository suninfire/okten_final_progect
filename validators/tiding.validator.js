const Joi = require('joi');

const {categoryEnum} = require('../constants');

const {statusCodes} = require('../constants');
const {ApiError} = require('../errors');


const bodyValidator = Joi.string()
    .max(500);

const categoryValidator = Joi.string()
    .valid(...Object.values(categoryEnum))
    .error(new ApiError('Category not valid', statusCodes.BAD_REQUEST));

const newTidingValidator = Joi.object({
    body: bodyValidator.required(),
    photo: Joi.string().required(),
    category: categoryValidator,
});

const updateTidingValidator = Joi.object({
    body: bodyValidator,
    photo: Joi.string(),
    category: categoryValidator,
});


module.exports = {
    newTidingValidator,
    updateTidingValidator
};