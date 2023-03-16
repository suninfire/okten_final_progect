const { Schema, model} = require('mongoose');

const userSchema = new Schema ({
    username: { type:String, trim: true, required: true},
    avatar: { type: String, default: ''},
    administrator :{ type: Boolean,default:false},
    pub:{ type: [Schema.Types.ObjectId],ref:'pub',select:true},
    adminPhone :{ type: String,default:' '},
    email: { type: String, trim: true, lowercase: true, required:true, unique:true},
    password: { type:String, required: true, select: false },
    drinker: { type: [Schema.Types.ObjectId],ref:'drinker',select:true},
    favoritePubs: { type: [Schema.Types.ObjectId],ref:'pub'},
    responses: { type: [Schema.Types.ObjectId],ref:'response',select:true},
    tidings:{ type: [Schema.Types.ObjectId],ref:'tiding', select:true},
    messages: { type: [String],select:true},
}, {

    timestamps:true,
    versionKey: false
});



module.exports = model('user', userSchema);