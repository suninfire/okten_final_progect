const { pubService, userService,responseService, tidingService } = require('../services');
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


    //TODO recurs to delete user's pub's responses
    deletePubById: async (req, res, next) => {

        try {
            const {pubId} = req.params;

            const pub = await pubService.getOneByParams({_id: pubId});

            const administratorId = pub.administrator.valueOf();
            const administrator = await userService.getOneByParams({_id: administratorId});
            const pubs = administrator.pub;
            const updatedPubs = await pubs.filter(pub => pub.valueOf() !== pubId);

            function isPubAdmin (pubs) {
                if (pubs === []) {
                    return false;
                } else {
                    return true;
                }};

            const isAdmin = isPubAdmin(pubs);

            await userService.updateUserById(administratorId,{administrator: isAdmin,pub: updatedPubs});

            await responseService.deleteMany({pub: pubId});
            await tidingService.deleteMany({pub: pubId});

            const responses = pub.responses.valueOf();


            const tidings = pub.tidings.valueOf();

            await pubService.deletePubById(pubId);

            res.sendStatus(statusCodes.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

};