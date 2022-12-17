const { Schema, model} = require('mongoose');
const {categoryEnum} = require('../constants');


const tidingSchema = new Schema ({
    body: { type: String, required: true},
    photo: { type: String, default: ''},
    category: { type: String,enum: Object.values(categoryEnum), required:true,trim: true,lowercase: true},
    user:{ type: Schema.Types.ObjectId,ref:'user',select:true},
    pub:{ type: Schema.Types.ObjectId,ref:'pub',select:true},
}, {

    timestamps:true,
    versionKey: false
});

module.exports = model('tiding', tidingSchema);