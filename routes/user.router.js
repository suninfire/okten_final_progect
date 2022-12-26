const {Router} = require('express');

const { userController} = require('../controllers');
const { commonMdlwr,userMdlwr } = require('../middlewares');
const { newUserValidator } = require('../validators/user.validator');

const userRouter = Router();

userRouter.get( //тільки для супер адміна
    '/',
);

userRouter.get( //тільки для супер адміна
    '/expect',
);

userRouter.get( //тільки для супер адміна
    '/expect/:pubId',
);

userRouter.get(
    '/:userId',
);

userRouter.get(
    '/:userId/responses',
);

userRouter.get(
    '/:userId/favPubs',
);

userRouter.get(
    '/:userId/drinker',
);

userRouter.post(
    '/',
    commonMdlwr.checkIsBodyValid(newUserValidator),
    userMdlwr.checkIsEmailUniq,
    userController.createUser
);


userRouter.put(
    '/:userId',
);


userRouter.delete(
    '/:userId',
);


module.exports = userRouter;