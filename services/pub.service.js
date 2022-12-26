const { Pub } = require('../dataBase');

module.exports = {
    getOneByParams(params) {
        return Pub.findOne(params);
    },

    createPub(pubObject) {
        return Pub.create(pubObject);
    },

};