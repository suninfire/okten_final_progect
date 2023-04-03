const { userService,tokenService, pubService, responseService, tidingService,drinkerService} = require('../services');
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

            res.status(statusCodes.CREATE).json(user._id);

        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {

        try {
            const {userId} = req.params;



            const user = await userService.getOneByParams({_id: userId});
            const userPhone = user.adminPhone;
            const updatedUser = await userService.updateUserById(userId, req.body);
            await pubService.updateMany({ contacts: userPhone}, { $set: { contacts: req.body.adminPhone && userPhone } })

            res.json(updatedUser);

        } catch (e) {
            next(e);
        }
    },

    updateUserAfterExpectPub: async (req, res, next) => {

        const { pubId } = req.params;

        try {
            const pub = await pubService.getOneByParams({_id: pubId});
            const user = await userService.getOneByParams({_id: pub.administrator.valueOf()})
            const pubs = user.pub;
            await pubs.push(pub);

            const body = {adminPhone: pub.contacts,administrator:true,pub:pubs};

            await userService.updateUserById(pub.administrator, body )

           next()
        } catch (e) {
            next(e);
        }
    },


   deleteUserById: async (req, res, next) => {

       try {
           const {userId} = req.params;

           await responseService.deleteMany({user: userId});
           await tidingService.deleteMany({user: userId});
           await drinkerService.deleteManyDrinkers({user: userId});

           await userService.deleteUserById(userId);

           res.sendStatus(statusCodes.NO_CONTENT);

       } catch (e) {
           next(e);
       }
   },

    likes: async (req, res, next) => {

        try {
            const userId = req.body.userId;
            const pubId = req.body.pubId;

            const user = await userService.getUserFavorites({_id: userId});

            const fav = await user.favoritePubs;

            if (fav.includes(pubId) === true){
               fav.splice(fav.indexOf(pubId), 1)
            }else {
                await fav.push(pubId)
            }

            await userService.updateUserById(userId, {favoritePubs: fav});

            res.json(fav);
        } catch (e) {
            next(e)
        }
    }
};