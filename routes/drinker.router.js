const {Router} = require('express');

const drinkerRouter = Router();

drinkerRouter.get(
    '/',
);

drinkerRouter.post(
    '/:userId'
);

drinkerRouter.put(
    '/:drinkerId',
);

drinkerRouter.delete(
    '/:drinkerId',
);

module.exports = drinkerRouter;