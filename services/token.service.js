const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require('../errors');
const { config } = require('../config');
const {statusCodes, tokenTypeEnum} = require('../constants');

module.exports = {

    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (password, hashPassword) => {
        const isPasswordSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordSame) {
            throw new ApiError('Wrong email or password', statusCodes.BAD_REQUEST);
        }
    },

    createAuthToken: (payload = {}) => {

        const access_token = jwt.sign(payload, config.ACCESS_SECRET_WORD, {expiresIn: config.ACCESS_TOKEN_LIFETIME});

        const refresh_token = jwt.sign(payload, config.REFRESH_SECRET_WORD, {expiresIn: config.REFRESH_TOKEN_LIFETIME});


        return {
            access_token,
            refresh_token
        };
    },

    checkToken: (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let word;

            if (tokenType === tokenTypeEnum.ACCESS) {
                word = config.ACCESS_SECRET_WORD;
            }
            if (tokenType === tokenTypeEnum.REFRESH) {
                word = config.REFRESH_SECRET_WORD;
            }

            return jwt.verify(token, word);
        } catch (e) {
            throw new ApiError('Token not valid', statusCodes.UNAUTHORIZED);
        }
    },
};