const { authService,tokenService,userService } = require('../services');
const { statusCodes } = require('../constants');

module.exports = {

    login: async (req,res,next) => {
        try {
            const { password } = req.body;
            const {_id: userId} = req.user;
            const user = await userService.getOneToComparePasswords({_id: userId});
            const hashPassword = user.password;

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
            const id = user.valueOf()

            await authService.deleteOneByParams({refresh_token: refresh_token});

            const authToken =  tokenService.createAuthToken({user});

            const newTokens = await authService.saveTokens({...authToken,user:id });

            res.json(newTokens);

        } catch (e) {
            next(e);
        }
    },
};