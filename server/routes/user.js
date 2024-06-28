const {Router} = require('express');
const User = require('../models/user')

const router = Router();

router.get('/signup', async (req, res)=>{
    return res.send('Signup');
})

router.post('/signup', async (req, res)=>{
    // console.log(req.body);
    const {fullName, email, password} = req.body;
    if(!fullName || !email || !password){
        return res.status(422).json({ error: 'Invalid' });
    }
    try {
        const userExists = await User.findOne({email:email});
        if(userExists){
            return res.status(422).json({ error: 'Email exists!!' });
        }
        await User.create({
            fullName,
            email, 
            password,
        })
        res.status(201).json({
            message: 'User Successfully Registered',
        });
    } catch (error) {
        res.status(422).send({ error: "Registration Not Successful" });
		console.log(error);
    }
    
})


module.exports = router