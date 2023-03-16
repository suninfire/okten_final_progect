const { Schema, model} = require('mongoose');


const responseSchema = new Schema ({
    rating: { type: Number, required: true},
    comment: { type: String },
    receipt: { type: String, default: ''},
    user:{ type: Schema.Types.ObjectId,ref:'user',select:true},
    pub:{ type: Schema.Types.ObjectId,ref:'pub',select:true},
    pubName: {type: Schema.Types.String.name, ref:'pub'}
}, {

    timestamps:true,
    versionKey: false
});

module.exports = model('response', responseSchema);