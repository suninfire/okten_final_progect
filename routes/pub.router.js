const {Router} = require('express');

const { pubController } = require('../controllers');
const { commonMdlwr, pubMdlwr} = require('../middlewares');
const {newPubValidator} = require('../validators/pub.validator');

const pubRouter = Router();

pubRouter.get(
    '/',
);

pubRouter.get(
    '/:pubId',
);

pubRouter.get(
    '/:pubId/tidings',
);

pubRouter.get(
    '/:pubId/responses',
);

pubRouter.post(
    '/:userId',
    commonMdlwr.checkIsBodyValid(newPubValidator),
    pubMdlwr.checkIsPubUniq,
    pubController.createPub
);

pubRouter.put(
    '/:pubId',
);


pubRouter.delete(
    '/:pubId',
);


module.exports = pubRouter;