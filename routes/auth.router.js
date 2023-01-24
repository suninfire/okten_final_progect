const {Router} = require('express');

const { authController } = require('../controllers');
const { authMdlwr, commonMdlwr } = require('../middlewares');
const { loginUserValidator } = require('../validators/user.validator');


const authRouter = Router();

authRouter.post(
    '/login',
    commonMdlwr.checkIsBodyValid(loginUserValidator),
    authController.login
);

authRouter.post(
    '/logout',
    authMdlwr.checkIsAccessToken,
    authController.logout
);

// authRouter.post(
//     '/refresh',
//     authMdlwr.checkIsRefreshToken,
//     authController.refresh,
// );


module.exports = authRouter;