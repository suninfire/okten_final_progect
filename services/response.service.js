const { Response } = require('../dataBase/Response');

module.exports = {
    getOne(filter) {
        return Response.findOne(filter);
    },
}