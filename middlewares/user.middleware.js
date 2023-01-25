const {ApiError} = require('../errors');
const {statusCodes} = require('../constants');
const {userService} = require('../services');

module.exports = {

    checkIsEmailUniq: async (req, res, next) => {

        try {
            const {email} = req.body;
            const {userId} = req.params;

            const userByEmail = await userService.getOneByParams({email, _id: {$ne: userId}});

            if (userByEmail && userByEmail._id.toString() !== userId) {
                return next(new ApiError('This email already exist', statusCodes.CONFLICT));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserDynamically: (from = 'body', fieldName = 'userId', dbField = fieldName) => async (req, res, next) => {

        try {
            const fieldToSearch = req[from][fieldName];// = req.body.userId

            const user = await userService.getOneByParams({ [dbField]: fieldToSearch});

            if (!user) {
                return next(new ApiError('User not found', statusCodes.NOT_FOUND));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
},
};