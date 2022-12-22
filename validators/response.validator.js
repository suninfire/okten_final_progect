const Joi = require('joi');


const newResponseValidator = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
    comment: Joi.string().max(500).required(),
    receipt: Joi.string().required()
});


module.exports = {
   newResponseValidator
};