const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { createToken } = require('../services/authentication');

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
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
})


userSchema.pre('save', async function(next) {
    // console.log(this.password);
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password, 12);
    }
    next();
});

userSchema.static('matchPassowrdAndGenerateToken', async function(email, password){
    const user = await this.findOne({email});
    if(!user) {
        throw new console.error("No User");
    }
    
    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch) {
        throw new console.error("Invalid");
    }
    
    const token = createToken(user);
    return token;
})


const User = mongoose.model('user', userSchema)

module.exports = User;