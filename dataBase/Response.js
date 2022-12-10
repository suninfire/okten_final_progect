const { Schema, model} = require('mongoose');


const responseSchema = new Schema ({
    rating: { type: Number, required: true},
    text: { type: String },
    receipt: { type: String, default: ''}
}, {

    timestamps:true,
    versionKey: false
});

module.exports = model('response', responseSchema);