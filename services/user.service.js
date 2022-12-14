const { User } = require('../dataBase');

module.exports = {
    getAllUsers(filter={}){
        return User.find(filter)
    },

    getOneByParams(filter) {
        return User.findOne(filter);
    },

    createUser(userObject) {
        return User.create(userObject);
    },

    updateUserById(userId, newUserObject) {
        return User.findOneAndUpdate({_id: userId}, newUserObject, {new: true});
    },

    deleteUserById(userId) {
        return User.deleteOne({_id: userId});
    },
    
};