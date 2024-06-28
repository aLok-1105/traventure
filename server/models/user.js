const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    profileImageURL:{
        type: String,
        default: '/images/profile.png'
    },
})


userSchema.pre('save', async function(next) {
    // console.log(this.password);
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model('user', userSchema)

module.exports = User;