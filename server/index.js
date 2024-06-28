const express = require('express');
const dotenv = require('dotenv');
const moongoose = require('mongoose');
const userRoute = require('./routes/user')

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

dotenv.config({ path: './config.env' });

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
