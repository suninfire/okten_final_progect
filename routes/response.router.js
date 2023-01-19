const {Router} = require('express');

const {responseController} = require('../controllers');
const {commonMdlwr} = require('../middlewares');
const {newResponseValidator} = require('../validators/response.validator');

const responseRouter = Router();


responseRouter.post(
    '/:userId/:pubId',
    commonMdlwr.checkIsBodyValid(newResponseValidator),
    responseController.CreateResponse
);

responseRouter.patch(
    '/:responseId',
    commonMdlwr.checkIsBodyValid(newResponseValidator),
    responseController.updateResponseById
);

responseRouter.delete(
    '/:responseId',
    responseController.deleteResponseById
);

module.exports = responseRouter;