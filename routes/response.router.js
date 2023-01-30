const {Router} = require('express');

const {responseController} = require('../controllers');
const {commonMdlwr, authMdlwr} = require('../middlewares');
const {newResponseValidator} = require('../validators/response.validator');

const responseRouter = Router();


responseRouter.post(
    '/:userId/:pubId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsBodyValid(newResponseValidator),
    responseController.CreateResponse
);

responseRouter.patch(
    '/:responseId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsPermit('responseId'),
    commonMdlwr.checkIsBodyValid(newResponseValidator),
    responseController.updateResponseById
);

responseRouter.delete(
    '/:responseId',
    authMdlwr.checkIsAccessToken,
    commonMdlwr.checkIsPermit('responseId'),
    responseController.deleteResponseById
);

module.exports = responseRouter;