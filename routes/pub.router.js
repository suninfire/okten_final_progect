const {Router} = require('express');

const { pubController, userController} = require('../controllers');
const { commonMdlwr, pubMdlwr,} = require('../middlewares');
const {newPubValidator, updatePubValidator} = require('../validators/pub.validator');

const pubRouter = Router();

pubRouter.get(
    '/', // юзер,адмін,суперадмін
    pubController.getAllPubs
);

pubRouter.get( //тільки для супер адміна
    '/expects',
    pubController.getPubsForExpect,
);

pubRouter.patch( //тільки для супер адміна
    '/expects/:pubId',
    userController.updateUserAfterExpectPub,
    pubController.updatePubById,
);

pubRouter.get( // юзер,адмін,суперадмін
    '/:pubId',
    pubController.getPubById
);

pubRouter.post(
    '/:userId',
    commonMdlwr.checkIsBodyValid(newPubValidator),
    pubMdlwr.checkIsPubUniq,
    pubController.createPub
);

pubRouter.patch( // адмін,суперадмін
    '/:pubId',
    commonMdlwr.checkIsBodyValid(updatePubValidator),
    pubController.updatePubById
);


pubRouter.delete( // адмін,суперадмін
    '/:pubId',
    pubController.deletePubById
);



pubRouter.get( // юзер,адмін,суперадмін
    '/tidings/:pubId',
    pubController.getAllTidings
);

pubRouter.get( // юзер,адмін,суперадмін
    '/responses/:pubId',
    pubController.getAllResponses
);


module.exports = pubRouter;