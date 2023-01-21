const {Router} = require('express');

const {tidingController} = require('../controllers');
const {newTidingValidator} = require('../validators/tiding.validator');
const {commonMdlwr} = require('../middlewares');

const tidingRouter = Router();

tidingRouter.get(
    '/',
    tidingController.getAllTidings
);

tidingRouter.get(
    '/:tidingId',
    tidingController.getTidingById
);

tidingRouter.post(
    '/:userId/:pubId',
    commonMdlwr.checkIsBodyValid(newTidingValidator),
    tidingController.CreateTiding
);

tidingRouter.patch(
    '/:tidingId',
    commonMdlwr.checkIsBodyValid(newTidingValidator),
    tidingController.updateTidingById
);

tidingRouter.delete(
    '/:tidingId',
    tidingController.deleteTidingById
);

module.exports = tidingRouter;