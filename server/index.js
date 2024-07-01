const express = require('express');
const dotenv = require('dotenv');
const moongoose = require('mongoose');
const userRoute = require('./routes/user')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { checkForAuthenticationAndCookie } = require('./middlewares/authentication');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json())

dotenv.config({ path: './config.env' });
app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend URL
    credentials: true,  // Allows cookies to be sent from frontend to backend
  }));
app.use(cookieParser());
app.use(checkForAuthenticationAndCookie('token'));

moongoose.connect(process.env.MONGO_URL, {
}).then(()=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log(err);
})




app.get('/', (req, res)=>{
    res.send('Hello');
})

app.use('/user', userRoute)

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
