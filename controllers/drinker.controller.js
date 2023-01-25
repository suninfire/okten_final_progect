const { userService,drinkerService } = require('../services');
const { statusCodes } = require('../constants');

module.exports = {

    getAllDrinkers: async (req, res, next) => {

        try {
            const drinkers = await drinkerService.getAllDrinkers(req.body);

            res.json(drinkers);

        } catch (e) {
            next(e);
        }
    },

    getDrinkerById: async (req, res, next ) => {

        const {drinkerId} = req.params;

        try {
            const drinker = await drinkerService.getOneDrinker({_id: drinkerId});

            res.json(drinker);

        } catch (e) {
            next(e);
        }
    },

    createDrinker: async (req, res, next) => {

        const userId = req.params.userId;
        const pubId = req.params.pubId;

        try {
            const drinker = await drinkerService.createDrinker({
                ...req.body,
                pub: pubId,
                meetOwner: userId,
            });

            const userDrinkers = await drinkerService.getDrinkersByParams({meetOwner: userId});

            await userService.updateUserById(userId,{drinker: [...userDrinkers]});

            res.status(statusCodes.CREATE).json(drinker);

        } catch (e) {
            next(e);
        }
    },

    updateDrinkerById: async (req, res, next) => {

        try {
            const {drinkerId} = req.params;

            const drinker = await drinkerService.updateDrinkerById({_id:drinkerId}, req.body);

            res.json(drinker);

        } catch (e) {
            next(e);
        }
    },

    deleteDrinkerById: async (req, res, next) => {

        try {
            const { drinkerId } = req.params;

            const drinker = await drinkerService.getOneDrinker({_id: drinkerId});

            const userId = drinker.meetOwner.valueOf();

            await drinkerService.deleteDrinkerById({_id:drinkerId});

            const userDrinker = await drinkerService.getDrinkersByParams({meetOwner: userId});

            await userService.updateUserById(userId,{drinker: [...userDrinker]});

            res.sendStatus(statusCodes.NO_CONTENT);

        } catch (e) {
            next(e);
        }
    },
};