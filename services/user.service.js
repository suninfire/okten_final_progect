const { User } = require('../dataBase');

module.exports = {

    getOneByParams(filter) {
        return User.findOne(filter);
    },

    createUser(userObject) {
        return User.create(userObject);
    },
    
};