const {Router} = require('express');

const userRouter = Router();

userRouter.get(
    '/:userId',
);

userRouter.post(
    '/',
);

userRouter.put(
    '/:userId',
);

userRouter.delete(
    '/:userId',
);

module.exports = userRouter;