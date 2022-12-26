const {Router} = require('express');

const tidingRouter = Router();

tidingRouter.get(
    '/:tidingId',
);

tidingRouter.post(
    '/:pubId',
);

tidingRouter.put(
    '/:tidingId',
);

tidingRouter.delete(
    '/:tidingId',
);

module.exports = tidingRouter;