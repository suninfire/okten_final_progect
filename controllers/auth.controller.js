const {authService,tokenService, emailService, actionTokenService, userService } = require('../services');
const {statusCodes, emailActionEnum, tokenTypeEnum, constant} = require('../constants');



module.exports = {

    login: async (req,res,next) => {
        try {
            const { password, email } = req.body;

            const user = await userService.getOneByParams({email: email});
            const  id  = user._id.valueOf();
            const pass = user.password;

            await tokenService.comparePasswords(password,pass);

            const authToken = tokenService.createAuthToken({id});

            await authService.saveTokens({...authToken, user: id});


            res.json({
                ...authToken,
                user: req.user
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

    // refresh: async (req,res,next) => {
    //     try {
    //
    //         const { user, refresh_token } = req.tokenInfo;
    //
    //         await authService.deleteOneByParams({refresh_token});
    //
    //
    //         const authToken = tokenService.createAuthToken({_id: user});
    //
    //         const newTokens = await authService.saveTokens({...authToken, user});
    //
    //         res.json(newTokens);
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    //

};