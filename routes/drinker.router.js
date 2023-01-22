const {Router} = require('express');

const {drinkerController} = require('../controllers');
const {newDrinkerValidator} = require('../validators/drinker.validator');
const {commonMdlwr} = require('../middlewares');

const drinkerRouter = Router();

drinkerRouter.get(
    '/',
    drinkerController.getAllDrinkers
);

drinkerRouter.get(
    '/:drinkerId',
    drinkerController.getDrinkerById
);

drinkerRouter.post(
    '/:userId/:pubId',
    commonMdlwr.checkIsBodyValid(newDrinkerValidator),
    drinkerController.createDrinker
);

drinkerRouter.patch(
    '/:drinkerId',
    commonMdlwr.checkIsBodyValid(newDrinkerValidator),
    drinkerController.updateDrinkerById
);

drinkerRouter.delete(
    '/:drinkerId',
    drinkerController.deleteDrinkerById
);

module.exports = drinkerRouter;