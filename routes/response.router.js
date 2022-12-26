const {Router} = require('express');

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