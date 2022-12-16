const {Router} = require('express');

const responseRouter = Router();

responseRouter.get(
    '/:responseId',
);

responseRouter.post(
    '/',
);

responseRouter.put(
    '/:responseId',
);

responseRouter.delete(
    '/:responseId',
);

module.exports = responseRouter;