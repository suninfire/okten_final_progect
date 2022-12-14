const { userService,tokenService, pubService} = require('../services');
const { statusCodes}  = require('../constants');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.body);
            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next ) => {

        const {userId} = req.params;

        try {

            const user = await userService.getOneByParams({_id: userId});

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await tokenService.hashPassword(req.body.password);

            const user = await userService.createUser({...req.body, password: hashPassword });

            res.status(statusCodes.CREATE).json(user);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.updateUserById(userId, req.body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },


   deleteUserById: async (req, res, next) => {
       try {
           const {userId} = req.params;

           await userService.deleteUserById(userId);

           res.sendStatus(statusCodes.NO_CONTENT);
       } catch (e) {
           next(e);
       }
   },
};