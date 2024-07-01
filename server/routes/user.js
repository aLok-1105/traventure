const {Router} = require('express');
const User = require('../models/user');
const { validateToken } = require('../services/authentication');

const router = Router();

router.get('/signup', async (req, res)=>{
    return res.send('Signup');
})

router.post('/signup', async (req, res)=>{
    const {fullName, email, password} = req.body;
    // console.log(req.body);
    if(!fullName || !email || !password){
        return res.status(422).json({ error: 'Fill Data' });
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

router.post('/signin', async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({ error: 'Invalid1' });
    }
    
    try {
        const validUser = await User.findOne({ email });
        const token = await User.matchPassowrdAndGenerateToken(email, password);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
          });
          const { password: pass, ...rest } = validUser._doc;
        res.status(201).json(rest);
    } catch (error) {
        return res.status(422).json({ error: 'Invalid' });
    }

})

router.get('/check-auth', (req, res) =>{
    const token = req.cookies.token;

    if (!token) {
        return res.status(200).json({ isAuthenticated: false });
    }

    try {
        const userPayload = validateToken(token);
        return res.status(200).json({ isAuthenticated: true });
    } catch (error) {
        return res.status(200).json({ isAuthenticated: false });
    }
})

router.post('/signout', (req, res) =>{
    res.clearCookie(token);
    res.status(200).json({ message: 'Signout successful' });
})


module.exports = router