const { Schema, model} = require('mongoose');
// const tokenService = require('../services/token.service');

const userSchema = new Schema ({
    username: { type:String, trim: true, required: true},
    email: { type: String, trim: true, lowercase: true, required:true, unique:true},
    password: { type:String, required: true},
    favoritePubs: { type: [Schema.Types.ObjectId],ref:'pub', select:true},
    comments: {},
    responses: { type: [Schema.Types.ObjectId]},ref:'response',select:true
}, {

    timestamps:true,
    versionKey: false
});

module.exports = model('user', userSchema);