const { Response, User} = require('../dataBase');


module.exports = {

    getResponsesByParams(filter) {
        return Response.find(filter);
    },

    getOneResponse(filter) {
        return Response.findOne(filter)
    },

    createResponse(responseObject) {
        return Response.create(responseObject);
    },

    updateResponseById(responseId, newUserObject) {
        return Response.findOneAndUpdate({_id: responseId}, newUserObject, {new: true});
    },

    deleteResponseById(responseId) {
        return Response.deleteOne({_id: responseId});
    },

    deleteMany(filter) {
        return Response.deleteMany(filter);
    },


}