const {Router} = require('express');
const User = require('../models/user');
const { validateToken, validateToken1 } = require('../services/authentication');

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
		    // console.log(error);
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
          });
          const { password: pass, ...rest } = validUser._doc;
        //   console.log(rest);
            res.status(201).json(rest);
    } catch (error) {
        return res.status(422).json({ error: 'Invalid' });
    }

})

router.post('/signout', (req, res, next) =>{
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Signout successful' });
    } catch (error) {
        next(error)
    }
    
})

router.get('/auth', (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(token){
      res.status(200).json({ message: 'Valid User'})
    }
    else{
      res.status(404).json({ message: 'Unauthorized'})
    }
  } catch (error) {
    next(error)
  }
})

router.put('/update/:id', validateToken1, async (req, res, next) => {
    if (req.user._id !== req.params.id) {
      return next('You are not allowed to update this user');
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        
        {
          $set: {
            fullName: req.body.fullName,
            email: req.body.email,
            profileImageURL: req.body.profileImageURL,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  });


module.exports = router