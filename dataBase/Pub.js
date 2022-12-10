const { Schema, model} = require('mongoose');


const pubSchema = new Schema ({
    name: { type:String, trim: true, required: true},
    photo: { type: String, default: ''},
    location: {type: String, required: true},
    time:{type: String,required: true},
    contacts:{type: String,required: true},
    news:{ type: [Schema.Types.ObjectId],ref:'new', select:true},
    views:{ type: Number},
    tags:{type: String},
    averageCheck:{type: Number},

}, {

    timestamps:true,
    versionKey: false
});

module.exports = model('pub', pubSchema);