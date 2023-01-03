
const { Schema, model} = require('mongoose');

const adminSchema = new Schema ({
    username: 'suninfire',
    email:'n.suninfire@gmail.com',
    password: { type:String, required: true}
}, {

    timestamps:true,
    versionKey: false
});



module.exports = model('admin', adminSchema);