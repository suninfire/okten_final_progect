const {Router} = require('express');

const tidingRouter = Router();

tidingRouter.get(
    '/:tidingId',
);

tidingRouter.post(
    '/',
);

tidingRouter.put(
    '/:tidingId',
);

tidingRouter.delete(
    '/:tidingId',
);

module.exports = tidingRouter;