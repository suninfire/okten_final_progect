const { pubService, userService } = require('../services');
const { statusCodes}  = require('../constants');

module.exports = {
    getAllPubs: async (req, res, next) => {
        try {
            const pubs = await pubService.getAll({expect: true});
            res.json(pubs);
        } catch (e) {
            next(e);
        }
    },

    getPubsForExpect: async (req, res, next) => {
        try {
            const pubs = await pubService.getAll({expect: false});
            res.json(pubs);
        } catch (e) {
            next(e);
        }
    },

    getPubById: async (req, res, next ) => {

        const {pubId} = req.params;

        try {

            const pub = await pubService.getOneByParams({_id: pubId});

            res.json(pub);
        } catch (e) {
            next(e);
        }
    },

    createPub: async (req, res, next) => {

        try {
            const pub = await pubService.createPub({...req.body, administrator: req.params.userId});
            res.status(statusCodes.CREATE).json(pub);
        } catch (e) {
            next(e);
        }
    },

    updatePubById: async (req, res, next) => {
        try {
            const {pubId} = req.params;

            const pub = await pubService.updatePubById(pubId, req.body);

            res.json(pub);
        } catch (e) {
            next(e);
        }
    },



    deletePubById: async (req, res, next) => {
        try {
            const {pubId} = req.params;

            await pubService.deletePubById(pubId);

            res.sendStatus(statusCodes.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    getAllTidings: async (req, res, next) => {
        const {pubId} = req.params;
        try {
            const tidings = await pubService.getAllT({pub: pubId});
            res.json(tidings);
        } catch (e) {
            next(e);
        }
    },
    getAllResponses: async (req, res, next) => {
        const {pubId} = req.params;
        try {
            const responses = await pubService.getAllR({pub: pubId});
            res.json(responses);
        } catch (e) {
            next(e);
        }
    },

};