const { responseService } = require('../services/response.service')

module.exports = {
    getOneById: async (req,res,next) => {

        const {responseId} = req.params;

        try {
            const response = await responseService.getOne({_id: responseId});
            res.json(response);
        } catch (e) {
            next(e)
        }
    }
}