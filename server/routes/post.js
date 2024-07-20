const { Router } = require('express');
const { validateToken1 } = require('../services/authentication');
const {
	createPost,
	getPost,
	updatePost,
	deletePost,
	likePost,
	unlikePost,
} = require('../controllers/post');

const router = Router();

router.post('/create', validateToken1, createPost);

router.get('/getPost', getPost);

router.put('/update/:id', updatePost);

router.delete('/deletePost/:id', deletePost);

router.put('/likePost', likePost);
router.put('/unlikePost', unlikePost);

module.exports = router;
