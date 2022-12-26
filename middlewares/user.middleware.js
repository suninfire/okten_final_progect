const {ApiError} = require('../errors');
const {statusCodes} = require('../constants');
const {userService} = require('../services');

module.exports = {
    checkIsEmailUniq: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {userId} = req.params;

            const userByEmail = await userService.getOneByParams({email, _id: {$ne: userId}});
            // _id: { $ne: userId } - search all except THIS userId

            if (userByEmail && userByEmail._id.toString() !== userId) {
                return next(new ApiError('This email already exist', statusCodes.CONFLICT));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};