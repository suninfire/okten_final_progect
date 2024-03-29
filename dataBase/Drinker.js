const { Schema, model} = require('mongoose');


const drinkerSchema = new Schema ({
    pub:{type: Schema.Types.ObjectId, ref:'pub', select:true,required:true},
    pubName:{type: String, select:true},
    pubLocation:{type: String, select:true},
    meetOwner:{type: Schema.Types.ObjectId,ref:'user', select:true,required:true},
    date:{type: String, required:true},
    time:{type: String, required:true},
    description:{type: String, required:true},
    criteria: {type: String, required:true}

}, {

    timestamps:true,
    versionKey: false
});

module.exports = model('drinker', drinkerSchema);