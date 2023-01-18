const {Router} = require('express');
const {responseController} = require('../controllers');
const {commonMdlwr} = require('../middlewares');

const {newResponseValidator} = require('../validators/response.validator');

const responseRouter = Router();

responseRouter.get(
    '/:responseId',
    // responseController.getOneById
);

responseRouter.post(
    '/:userId/:pubId',
    commonMdlwr.checkIsBodyValid(newResponseValidator),
    responseController.CreateResponse
);

responseRouter.put(
    '/:responseId',
);

responseRouter.delete(
    '/:responseId',
);

module.exports = responseRouter;