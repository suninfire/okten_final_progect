const { userService,tokenService } = require('../services');
const { statusCodes}  = require('../constants');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const hashPassword = await tokenService.hashPassword(req.body.password);

            const user = await userService.createUser({...req.body, password: hashPassword });

            res.status(statusCodes.CREATE).json(user);
        } catch (e) {
            next(e);
        }
    },
};