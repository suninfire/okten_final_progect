const {ApiError} = require('../errors');
const {statusCodes} = require('../constants');


module.exports = {

    checkIsBodyValid: (validatorType) => async (req, res, next) => {

        try {
            const validate = await validatorType.validate(req.body);

            if (validate.error) {
                return next(new ApiError(validate.error.message, statusCodes.BAD_REQUEST));
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },
};