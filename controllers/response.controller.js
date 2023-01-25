const {responseService, userService, pubService} = require('../services');
const {statusCodes} = require('../constants');

module.exports = {

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

    updateResponseById: async (req, res, next) => {

        try {
            const {responseId} = req.params;

            const response = await responseService.updateResponseById(responseId, req.body);

            res.json(response);

        } catch (e) {
            next(e);
        }
    },

    deleteResponseById: async (req, res, next) => {

        try {
            const { responseId } = req.params;

            const Response = await responseService.getOneResponse({_id: responseId});

            const userId = Response.user.valueOf();
            const pubId = Response.pub.valueOf();

            await responseService.deleteResponseById(responseId);

            const userResponses = await responseService.getResponsesByParams({user: userId});
            await userService.updateUserById(userId,{responses: [...userResponses]});

            const pubResponses = await responseService.getResponsesByParams({pub: pubId});
            await pubService.updatePubById(pubId,{responses: [...pubResponses]});


            res.sendStatus(statusCodes.NO_CONTENT);

        } catch (e) {
            next(e);
        }
    },
};