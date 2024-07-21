const express = require('express');
const dotenv = require('dotenv');
const moongoose = require('mongoose');
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const cookieParser = require('cookie-parser');
const { checkForAuthenticationAndCookie } = require('./middlewares/authentication');
const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'https://traventure-iota.vercel.app', 
    // origin:'http://localhost:3000', 
    credentials:true,         
}
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cookieParser());
app.use(checkForAuthenticationAndCookie('token'));

dotenv.config({ path: './config.env' });

moongoose.connect(process.env.MONGO_URL, {
}).then(()=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log(err);
})




app.get('/', (req, res)=>{
    res.send('Hello from Server');
})

app.use('/user', userRoute)
app.use('/post', postRoute)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
