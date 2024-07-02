const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    budget:{
        type:String,
        required:true
    },
    days:{
        type: Number,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    imageURL:{
        type: String,
        default: 'https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?cs=srgb&dl=pexels-pripicart-620337.jpg&fm=jpg'
    },
    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    isPublic :{
        type: Boolean,
        default: true
    }
},{ timestamps: true })



const Post = mongoose.model('post', postSchema)

module.exports = Post;