const {Router} = require('express');

const { authController } = require('../controllers');
const { authMdlwr, commonMdlwr, userMdlwr } = require('../middlewares');
const { loginUserValidator } = require('../validators/user.validator');


const authRouter = Router();

authRouter.post(
    '/login',
    commonMdlwr.checkIsBodyValid(loginUserValidator),
    userMdlwr.getUserDynamically('body','email'),
    authController.login
);

authRouter.post(
    '/logout',
    authMdlwr.checkIsAccessToken,
    authController.logout
);

authRouter.post(
    '/refresh',
    authMdlwr.checkIsRefreshToken,
    authController.refresh,
);


module.exports = authRouter;