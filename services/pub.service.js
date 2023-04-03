const { Pub } = require('../dataBase');

module.exports = {

    getAll(filter = {}){
        return Pub.find(filter)
    },


    getOneByParams(params={}) {
        return Pub.findOne(params);
    },

    createPub(pubObject) {
        return Pub.create(pubObject);
    },

    updatePubById(pubId, newPubObject) {
        return Pub.findOneAndUpdate({_id: pubId}, newPubObject, {new: true});
    },

    deletePubById(pubId) {
        return Pub.deleteOne({_id: pubId});
    },

    deleteMany(filter) {
        return Pub.deleteMany(filter);
    },

    updateMany(filter) {
        return Pub.updateMany(filter)
    }
};