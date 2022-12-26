//TODO

const { Schema, model} = require('mongoose');

const adminSchema = new Schema ({
    username: { type:String, trim: true, required: true},
    email: { type: String, trim: true, lowercase: true, required:true, unique:true},
    password: { type:String, required: true},
    superAdministrator :{ type: Boolean,default:false},
    expects: { type: [Schema.Types.ObjectId],ref:'pub',select:true},
}, {

    timestamps:true,
    versionKey: false
});



module.exports = model('admin', adminSchema);