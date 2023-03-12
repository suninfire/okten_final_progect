const {Router} = require('express');

const {drinkerController} = require('../controllers');
const {newDrinkerValidator} = require('../validators/drinker.validator');
const {commonMdlwr, authMdlwr} = require('../middlewares');

const drinkerRouter = Router();

drinkerRouter.get(
    '/',
    authMdlwr.checkIsAccessToken,
    drinkerController.getAllDrinkers
);

drinkerRouter.get(
    '/:userId',
    authMdlwr.checkIsAccessToken,
    drinkerController.getDrinkerById
);

drinkerRouter.post(
    '/:userId/:pubId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsBodyValid(newDrinkerValidator),
    drinkerController.createDrinker
);

drinkerRouter.patch(
    '/:drinkerId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsPermit('drinkerId'),
    commonMdlwr.checkIsBodyValid(newDrinkerValidator),
    drinkerController.updateDrinkerById
);

drinkerRouter.delete(
    '/:drinkerId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsPermit('drinkerId'),
    drinkerController.deleteDrinkerById
);

module.exports = drinkerRouter;