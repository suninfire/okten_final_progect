const {Router} = require('express');

const { userController } = require('../controllers');
const { commonMdlwr,userMdlwr,authMdlwr } = require('../middlewares');
const { newUserValidator, updateUserValidator} = require('../validators/user.validator');

const userRouter = Router();

userRouter.get(
    '/',
    authMdlwr.checkIsAccessToken,
    userMdlwr.checkIsSuperAdmin,
    userController.getAllUsers
);

userRouter.get(
    '/:userId',
    authMdlwr.checkIsAccessToken,
    userMdlwr.checkIsPermit,
    userController.getUserById
);

userRouter.post(
    '/',
    commonMdlwr.checkIsBodyValid(newUserValidator),
    userMdlwr.checkIsEmailUniq,
    userController.createUser
);


userRouter.patch(
    '/:userId',
    authMdlwr.checkIsAccessToken,
    userMdlwr.checkIsPermit,
    commonMdlwr.checkIsBodyValid(updateUserValidator),
    userController.updateUserById
);

userRouter.patch(
    '/likes/pubs',
    authMdlwr.checkIsAccessToken,
    userController.likes
);

userRouter.delete(
    '/:userId',
    authMdlwr.checkIsAccessToken,
    userMdlwr.checkIsPermit,
    userController.deleteUserById
);


module.exports = userRouter;