const {Router} = require('express');

const tidingRouter = Router();

tidingRouter.get(
    '/',
);

tidingRouter.get(
    '/:tidingId',
);

tidingRouter.post(
    '/:pubId',
);

tidingRouter.patch(
    '/:tidingId',
);

tidingRouter.delete(
    '/:tidingId',
);

module.exports = tidingRouter;