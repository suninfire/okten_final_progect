const { Drinker } = require('../dataBase');


module.exports = {
    getAllDrinkers(filter={}){
        return Drinker.find(filter)
    },

    getDrinkersByParams(filter) {
        return Drinker.find(filter);
    },

    getOneDrinker(filter) {
        return Drinker.findOne(filter)
    },

    createDrinker(drinkerObject) {
        return Drinker.create(drinkerObject);
    },

    updateDrinkerById(drinkerId, newDrinkerObject) {
        return Drinker.findOneAndUpdate(drinkerId, newDrinkerObject, {new: true});
    },

    deleteDrinkerById(drinkerId) {
        return Drinker.deleteOne(drinkerId);
    },

    deleteManyDrinkers(filter) {
        return Drinker.deleteMany(filter);
    }
};