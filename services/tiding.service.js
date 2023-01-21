const { Tiding } = require('../dataBase');


module.exports = {
    getAllTidings(filter={}){
        return Tiding.find(filter)
    },

    getTidingsByParams(filter) {
        return Tiding.find(filter);
    },

    getOneTiding(filter) {
        return Tiding.findOne(filter)
    },

    createTiding(tidingObject) {
        return Tiding.create(tidingObject);
    },

    updateTidingById(tidingId, newTidingObject) {
        return Tiding.findOneAndUpdate({_id: tidingId}, newTidingObject, {new: true});
    },

    deleteTidingById(tidingId) {
        return Tiding.deleteOne({_id: tidingId});
    },

    deleteMany(filter) {
        return Tiding.deleteMany(filter);
    }
};