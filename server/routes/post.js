const {Router} = require('express');
const Post = require('../models/post');
const { validateToken1 } = require('../services/authentication');

const router = Router();

router.post('/create', validateToken1, async (req, res)=>{
    console.log(req.body);
    const {title, location, budget, days, description, imageURL} = req.body.formData;
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
            imageURL: imageURL == null ? 'https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?cs=srgb&dl=pexels-pripicart-620337.jpg&fm=jpg' : imageURL,
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


router.get('/getPost', async (req, res, next)=>{
    try {
        const startIdx = parseInt(req.query.startIdx) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order == 'asc' ? 1 : -1;
        const posts = await Post.find({
            // ...(req.query.createdBy && {createdBy: req.query.createdBy}),
            ...(req.query.title && {title: req.query.title}),
            ...(req.query.location && {location: req.query.location}),
            ...(req.query.budget && {budget: req.query.budget}),
            ...(req.query.days && {days: req.query.days}),
            ...(req.query.description && {description: req.query.description}),
            ...(req.query.searchTerm && {
                $or: [
                    {title: {$regex: req.query.searchTerm, $options: 'i'}},
                    {location: {$regex: req.query.searchTerm, $options: 'i'}},
                    {description: {$regex: req.query.searchTerm, $options: 'i'}},
                ],
            }),
        }).sort({updatedAt: sortDirection})
        .skip(startIdx)
        .limit(limit);

        res.status(200).json({posts: posts});

    } catch (error) {
        next(error)
    }
    
})

module.exports = router