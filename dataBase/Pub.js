const { Schema, model } = require('mongoose');


const pubSchema = new Schema ({
    expect: { type:Boolean, default:false, select: true},
    administrator: { type: [Schema.Types.ObjectId], ref:'user', select:true},
    name: { type:String, trim: true, required: true},
    photo: { type: String, default: ''},
    location: {type: String, trim: true, required: true},
    openTime:{type: String, trim: true, required: true},
    closeTime:{type: String, trim: true, required: true},
    contacts:{type: [String],trim:true, select:true},
    tidings:{ type: [Schema.Types.ObjectId],ref:'tiding', select:true},
    responses: { type: [Schema.Types.ObjectId],ref:'response',select:true},
    views:{ type: Number},
    tags:{type: [String]},
    averageCheck:{type: Number, default: 0},
}, {

    timestamps:true,
    versionKey: false
});

module.exports = model('pub', pubSchema);