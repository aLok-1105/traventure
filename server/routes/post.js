const {Router} = require('express');
const Post = require('../models/post');
const { validateToken1 } = require('../services/authentication');

const router = Router();

router.post('/create', validateToken1, async (req, res)=>{
    console.log(req.body);
    const {title, location, budget, days, description} = req.body.formData;
    if(!title || !location || !budget || !days || !description){
        return res.status(422).json({ error: 'Fill Data' });
    }
    try {
        await Post.create({
            title,
            location,
            budget,
            days,
            description,
            createdBy: req.user._id,
        });
        res.status(201).json({
            message: 'Post Successfully Created',
        });
    } catch (error) {
        res.status(422).send({ error: "Post Not Created" });
        console.log(error);
    }

})

module.exports = router