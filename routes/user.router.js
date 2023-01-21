const {Router} = require('express');

const { userController } = require('../controllers');
const { commonMdlwr,userMdlwr } = require('../middlewares');
const { newUserValidator, updateUserValidator} = require('../validators/user.validator');
const {SUPER_ADMIN_EMAIL} = require('../config/config');

const userRouter = Router();

userRouter.get( //тільки для супер адміна
    '/',
    // commonMdlwr.checkIsPermit(SUPER_ADMIN_EMAIL),
    userController.getAllUsers
);

userRouter.get(
    '/:userId',
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
    // commonMdlwr.checkIsPermit(),
    commonMdlwr.checkIsBodyValid(updateUserValidator),
    userController.updateUserById
);


userRouter.delete(
    '/:userId',
    // commonMdlwr.checkIsPermit(),
    userController.deleteUserById
);


module.exports = userRouter;