const { Schema, model} = require('mongoose');
const {categoryEnum} = require('../constants');


const newSchema = new Schema ({
    body: { type: String, required: true},
    category: { type: String,enum: Object.values(categoryEnum), required:true,trim: true,lowercase: true},
}, {

    timestamps:true,
    versionKey: false
});

module.exports = model('new', newSchema);