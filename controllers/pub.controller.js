const { pubService } = require('../services');
const { statusCodes}  = require('../constants');

module.exports = {
    createPub: async (req, res, next) => {
        try {
            console.log(req.params.userId);
            const pub = await pubService.createPub({...req.body, administrator: req.params.userId });

            res.status(statusCodes.CREATE).json(pub);
        } catch (e) {
            next(e);
        }
    },
};