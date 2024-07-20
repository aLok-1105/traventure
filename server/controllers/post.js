const Post = require('../models/post');

async function createPost(req, res) {
	const { title, location, budget, days, description, imageURL, groupSize } =
		req.body.formData;
	if (!title || !location || !budget || !days || !description) {
		return res.status(422).json({ error: 'Fill Data' });
	}
	try {
		await Post.create({
			title,
			location,
			budget,
			days,
			description,
			groupSize,
			imageURL:
				imageURL == null
					? 'https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?cs=srgb&dl=pexels-pripicart-620337.jpg&fm=jpg'
					: imageURL,
			createdBy: req.user._id,
		});
		res.status(201).json({
			message: 'Post Successfully Created',
		});
	} catch (error) {
		res.status(422).send({ error: 'Post Not Created' });
		console.log(error);
	}
}

async function getPost(req, res, next) {
	try {
		const startIdx = parseInt(req.query.startIdx) || 0;
		const limit = parseInt(req.query.limit) || 9;
		const sortDirection = req.query.order == 'asc' ? 1 : -1;
		const posts = await Post.find({
			// ...(req.query.createdBy && {createdBy: req.query.createdBy}),
			...(req.query.title && { title: req.query.title }),
			...(req.query.location && { location: req.query.location }),
			...(req.query.budget && { budget: req.query.budget }),
			...(req.query.days && { days: req.query.days }),
			...(req.query.likes && { days: req.query.likes }),
			...(req.query.description && {
				description: req.query.description,
			}),
			...(req.query.createdBy && { description: req.query.createdBy }),
			...(req.query.searchTerm && {
				$or: [
					{
						title: {
							$regex: req.query.searchTerm,
							$options: 'i',
						},
					},
					{
						location: {
							$regex: req.query.searchTerm,
							$options: 'i',
						},
					},
					{
						description: {
							$regex: req.query.searchTerm,
							$options: 'i',
						},
					},
				],
			}),
		})
			.populate('createdBy')
			.sort({ likes: sortDirection })
			.skip(startIdx)
			.limit(limit);

		// console.log(posts[0].createdBy);

		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
}

async function updatePost(req, res) {
	try {
		const updatePost = await Post.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					title: req.body.title,
					location: req.body.location,
					budget: req.body.budget,
					days: req.body.days,
					description: req.body.description,
					groupSize: req.body.groupSize,
					imageURL: req.body.imageURL,
				},
			},
			{ new: true }
		);
		// console.log(updatePost);
		res.status(200).json(updatePost);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}

async function deletePost(req, res) {
	// console.log(req.params.id);
	try {
		const deletedPost = await Post.deleteOne({ _id: req.params.id });
		console.log(deletedPost);
		res.status(200).json(deletedPost);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function likePost(req, res){
	try {
		const updatePost = await Post.findByIdAndUpdate(
			req.body._id,
			{
				$push: {
					likes: req.user._id,
				}
			},
			{ new: true }
		)
		res.status(200).json(updatePost);	
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}

async function unlikePost(req, res){
	try {
		const updatePost = await Post.findByIdAndUpdate(
			req.body._id,
			{
				$pull: {
					likes: req.user._id,
				}
			},
			{ new: true }
		)
		res.status(200).json(updatePost);	
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}

module.exports = { createPost, getPost, updatePost, deletePost, likePost, unlikePost };
