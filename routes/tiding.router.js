const {Router} = require('express');

const {tidingController} = require('../controllers');
const {newTidingValidator} = require('../validators/tiding.validator');
const {commonMdlwr, authMdlwr} = require('../middlewares');

const tidingRouter = Router();

tidingRouter.get(
    '/',
    authMdlwr.checkIsAccessToken,
    tidingController.getAllTidings
);

tidingRouter.get(
    '/:tidingId',
    authMdlwr.checkIsAccessToken,
    tidingController.getTidingById
);

tidingRouter.post(
    '/:userId/:pubId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsBodyValid(newTidingValidator),
    tidingController.CreateTiding
);

tidingRouter.patch(
    '/:tidingId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsPermit('tidingId'),
    commonMdlwr.checkIsBodyValid(newTidingValidator),
    tidingController.updateTidingById
);

tidingRouter.delete(
    '/:tidingId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsPermit('tidingId'),
    tidingController.deleteTidingById
);

module.exports = tidingRouter;