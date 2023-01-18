const { Response } = require('../dataBase');


module.exports = {
    getOne(filter) {
        return Response.findOne(filter);
    },

    getResponsesByParams(filter) {
        return Response.find(filter);
    },

    createResponse(responseObject) {
        return Response.create(responseObject);
    },
}