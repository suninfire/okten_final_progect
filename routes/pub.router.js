const {Router} = require('express');

const { pubController, userController} = require('../controllers');
const { commonMdlwr, pubMdlwr, authMdlwr, userMdlwr,} = require('../middlewares');
const {newPubValidator, updatePubValidator} = require('../validators/pub.validator');

const pubRouter = Router();

pubRouter.get(
    '/',
    pubController.getAllPubs
);

pubRouter.get(
    '/expects',
    authMdlwr.checkIsAccessToken,
    userMdlwr.checkIsSuperAdmin,
    pubController.getPubsForExpect,
);

pubRouter.get(
    '/:pubId',
    authMdlwr.checkIsAccessToken,
    pubController.getPubById
);

pubRouter.post(
    '/:userId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsBodyValid(newPubValidator),
    pubMdlwr.checkIsPubUniq,
    pubController.createPub
);

pubRouter.patch(
    '/:pubId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsPermit('pubId'),
    commonMdlwr.checkIsBodyValid(updatePubValidator),
    pubController.updatePubById
);

pubRouter.patch(
    '/expects/:pubId',
    authMdlwr.checkIsAccessToken,
    userMdlwr.checkIsSuperAdmin,
    userController.updateUserAfterExpectPub,
    pubController.updatePubById,
);


pubRouter.delete(
    '/:pubId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsPermit('pubId'),
    pubController.deletePubById
);

module.exports = pubRouter;