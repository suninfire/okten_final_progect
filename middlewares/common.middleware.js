const {ApiError} = require('../errors');
const {statusCodes} = require('../constants');
const {config} = require("../config");


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

    checkIsPermit: (param) => (req, res, next) => {

        try {
           const id = req.params[param];

            const user = req.tokenInfo.user;

            const email = user.email;

          let fields;

          if (param === 'pubId') {fields = user.pub;}
          if (param === 'drinkerId') {fields = user.drinker;}
          if (param === 'tidingId') {fields = user.tidings;}
          if (param === 'responseId') {fields = user.responses;}


            function isPermit (fields) {
              if (fields.length < 1){
                  return true;
              } else {
                  for (const field of fields) {
                      return id !== field.valueOf();
                  }
              }
            };

            const permit = isPermit(fields);

            if (permit === false && email !== config.SUPER_ADMIN_EMAIL) {
                return next(new ApiError('You dont have permission', statusCodes.BAD_REQUEST));
            }

            next();

        } catch (e) {
            next(e)
        }
    }
};