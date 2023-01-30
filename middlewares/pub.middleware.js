const {ApiError} = require('../errors');
const {statusCodes} = require('../constants');
const {pubService} = require('../services');

module.exports = {
    checkIsPubUniq: async (req, res, next) => {

        try {
            const {name} = req.body;
            const {pubId} = req.params;

            const pubByName = await pubService.getOneByParams({name, _id: {$ne: pubId}});

            if (pubByName && pubByName._id.toString() !== pubId) {
                return next(new ApiError('This pub already exist', statusCodes.CONFLICT));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};