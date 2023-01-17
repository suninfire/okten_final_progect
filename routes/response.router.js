const {Router} = require('express');
const {responseController} = require('../controllers/response.controller');

const responseRouter = Router();

responseRouter.get(
    '/:responseId',
);

responseRouter.post(
    '/:userId/:pubId',
);

responseRouter.put(
    '/:responseId',
);

responseRouter.delete(
    '/:responseId',
);

module.exports = responseRouter;