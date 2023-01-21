
const {responseService, userService, pubService,tidingService} = require('../services');
const {statusCodes} = require('../constants');

module.exports = {
    getAllTidings: async (req, res, next) => {
        try {
            const tidings = await tidingService.getAllTidings(req.body);
            res.json(tidings);
        } catch (e) {
            next(e);
        }
    },

    getTidingById: async (req, res, next ) => {

        const {tidingId} = req.params;

        try {

            const tiding = await tidingService.getOneTiding({_id: tidingId});

            res.json(tiding);
        } catch (e) {
            next(e);
        }
    },

    CreateTiding: async (req, res, next) => {

        const userId = req.params.userId;
        const pubId = req.params.pubId;

        try {

            const tiding = await tidingService.createTiding({
                ...req.body,
                user: userId,
                pub: pubId
            });

            const userTidings = await tidingService.getTidingsByParams({user: userId});

            await userService.updateUserById(userId,{tidings: [...userTidings]});

            const pubTidings = await tidingService.getTidingsByParams({pub: pubId});

            await pubService.updatePubById(pubId,{tidings: [...pubTidings]});

            res.status(statusCodes.CREATE).json(tiding);

        } catch (e) {
            next(e);
        }
    },

    updateTidingById: async (req, res, next) => {

        try {
            const {tidingId} = req.params;

            const tiding = await tidingService.updateTidingById(tidingId, req.body);

            res.json(tiding);
        } catch (e) {
            next(e);
        }
    },

    deleteTidingById: async (req, res, next) => {
        try {
            const { tidingId } = req.params;

            const tiding = await tidingService.getOneTiding({_id: tidingId});

            const userId = tiding.user.valueOf();

            const pubId = tiding.pub.valueOf();

            await tidingService.deleteTidingById(tidingId);

            const userTidings = await tidingService.getTidingsByParams({user: userId});
            await userService.updateUserById(userId,{tidings: [...userTidings]});

            const pubTidings = await tidingService.getTidingsByParams({pub: pubId});
            await pubService.updatePubById(pubId,{tidings: [...pubTidings]});


            res.sendStatus(statusCodes.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },
};