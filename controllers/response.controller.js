
const {responseService, userService, pubService} = require('../services');
const {statusCodes} = require('../constants');

module.exports = {
    getOneById: async (req,res,next) => {

        const {responseId} = req.params;

        try {
            const response = await responseService.getOne({_id: responseId});
            res.json(response);
        } catch (e) {
            next(e)
        }
    },

    CreateResponse: async (req, res, next) => {
       
        const userId = req.params.userId;
        const pubId = req.params.pubId;

        try {

            const response = await responseService.createResponse({
                ...req.body,
                user: userId,
                pub: pubId
            });

            const userResponses = await responseService.getResponsesByParams({user: userId});

            await userService.updateUserById(userId,{responses: [...userResponses]});

            const pubResponses = await responseService.getResponsesByParams({pub: pubId});

            await pubService.updatePubById(pubId,{responses: [...pubResponses]});

            res.status(statusCodes.CREATE).json(response);
        } catch (e) {
            next(e);
        }
    },
}