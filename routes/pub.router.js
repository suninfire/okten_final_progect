const {Router} = require('express');

const pubRouter = Router();

pubRouter.get(
    '/',
    <div>'pubs page'</div>
);

pubRouter.post(
    '/',
);

pubRouter.put(
    '/:pubId',
);

pubRouter.delete(
    '/:pubId',
);

module.exports = pubRouter;