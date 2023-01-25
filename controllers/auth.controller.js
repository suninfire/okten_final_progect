const { authService,tokenService } = require('../services');
const { statusCodes } = require('../constants');

module.exports = {

    login: async (req,res,next) => {
        try {
            const { password } = req.body;
            const {password: hashPassword, _id: userId} = req.user;

            await tokenService.comparePasswords(password,hashPassword);

            const authToken = tokenService.createAuthToken({userId});

            await authService.saveTokens({...authToken, user: userId});

            res.json({
                ...authToken,
                user: userId
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {user, access_token} = req.tokenInfo;

            await authService.deleteOneByParams({user: user._id, access_token});

            res.sendStatus(statusCodes.NO_CONTENT);

        } catch (e) {
            next(e);
        }
    },

    refresh: async (req,res,next) => {
        try {

            const { user, refresh_token } = req.tokenInfo;

            await authService.deleteOneByParams({refresh_token});

            const authToken = tokenService.createAuthToken({_id: user});

            const newTokens = await authService.saveTokens({...authToken, user});

            res.json(newTokens);

        } catch (e) {
            next(e);
        }
    },
};