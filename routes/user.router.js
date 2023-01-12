const {Router} = require('express');

const { userController } = require('../controllers');
const { commonMdlwr,userMdlwr } = require('../middlewares');
const { newUserValidator, updateUserValidator} = require('../validators/user.validator');

const userRouter = Router();

userRouter.get( //тільки для супер адміна
    '/',
    userController.getAllUsers
);

userRouter.get(
    '/:userId',
    userController.getUserById
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


userRouter.patch(
    '/:userId',
    commonMdlwr.checkIsBodyValid(updateUserValidator),
    userController.updateUserById
);


userRouter.delete(
    '/:userId',
    userController.deleteUserById
);


module.exports = userRouter;