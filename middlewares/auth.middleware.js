const { statusCodes, tokenTypeEnum } = require('../constants');
const {ApiError} = require('../errors');
const {authService, tokenService} = require('../services');

module.exports = {

    checkIsAccessToken: async (req,res,next) => {

        try {

            const access_token = await req.get(tokenTypeEnum.AUTHORISATION);

            if (!access_token) {
                return next (new ApiError('No token', statusCodes.UNAUTHORIZED));
            }

            await tokenService.checkToken(access_token);

            const tokenInfo = await authService.getOneWithUser({access_token});

            if (!tokenInfo) {
                return next (new ApiError('Not valid token', statusCodes.UNAUTHORIZED));
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsRefreshToken: async (req,res,next) => {

        try {
            const refresh_token = req.get(tokenTypeEnum.AUTHORISATION);

            if (!refresh_token) {
                return next (new ApiError('No token', statusCodes.UNAUTHORIZED));
            }

            tokenService.checkToken(refresh_token, tokenTypeEnum.REFRESH);

            const tokenInfo = await authService.getOneByParams({refresh_token});

            if (!tokenInfo) {
                return next (new ApiError('Not valid token', statusCodes.UNAUTHORIZED));
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },
};