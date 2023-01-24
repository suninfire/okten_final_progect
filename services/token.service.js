const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require('../errors');
const { config } = require('../config');
const {statusCodes, tokenTypeEnum} = require('../constants');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10), //бібліотека хешує пароль і повертає захешований

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
    //
    // createActionToken: (tokenType, payload = {}) => {
    //     let expiresIn = '1d';
    //
    //     if (tokenType === tokenTypeEnum.FORGOT_PASSWORD) {
    //         expiresIn = '7d';
    //     }
    //
    //     return jwt.sign(payload, config.ACTION_TOKEN_SECRET, {expiresIn} );
    // },
    //
    //
    checkToken: (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let word;

            switch ( tokenType ) {
                case tokenTypeEnum.ACCESS:
                    word = config.ACCESS_SECRET_WORD;
                    break;
                case tokenTypeEnum.REFRESH:
                    word = config.REFRESH_SECRET_WORD;
                    break;
                case tokenTypeEnum.FORGOT_PASSWORD:
                    word = config.ACTION_TOKEN_SECRET;
                    break;
                default:
                    throw new Error('Wrong word');
            }

            return jwt.verify(token, word);
        } catch (e) {
            throw new ApiError('Token not valid', statusCodes.UNAUTHORIZED);
        }
    },
};