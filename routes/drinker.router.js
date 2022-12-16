const {Router} = require('express');

const drinkerRouter = Router();

drinkerRouter.get(
    '/:drinkerId',
);

drinkerRouter.post(
    '/',
);

drinkerRouter.put(
    '/:drinkerId',
);

drinkerRouter.delete(
    '/:drinkerId',
);

module.exports = drinkerRouter;