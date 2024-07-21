const { error } = require('console');
const User = require('../models/user');

async function createUser(req, res) {
	const { fullName, email, password } = req.body;
	// console.log(req.body);
	if (!fullName || !email || !password) {
		return res.status(422).json({ error: 'Fill Data' });
	}
	try {
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			return res.status(422).json({ error: 'Email exists!!' });
		}
		await User.create({
			fullName,
			email,
			password,
		});
		res.status(201).json({
			message: 'User Successfully Registered',
		});
	} catch (error) {
		res.status(422).send({ error: 'Registration Not Successful' });
		// console.log(error);
	}
}

async function signinUser(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(422).json({ error: 'Invalid1' });
	}

	try {
		const validUser = await User.findOne({ email });
		const token = await User.matchPassowrdAndGenerateToken(
			email,
			password
		);
		if(token === null ){
			return res.status(401).json({error:'Invalid Crendentials'})
		}
		res.cookie('token', token, {
			httpOnly: true, // Ensure the cookie is HTTP only
			secure: true, // Ensure the cookie is secure if using HTTPS
			sameSite: 'None', // Adjust as necessary
		});
		// res.cookie('token', token, {
		// 	// httpOnly: true,
		// 	// expires: 7 * 24 * 60 * 60 * 1000,
		// 	sameSite: 'None',
		// 	secure: true, //only for localhost
		// });
		const { password: pass, ...rest } = validUser._doc;
		
		res.status(200).json(rest);
	} catch (error) {
		return res.status(400).json({ error: 'Invalid' });
	}
}

function signoutUser(req, res, next) {
	try {
		res.clearCookie('token', {
            httpOnly: true, // Same as when the cookie was set
            secure: true, // Same as when the cookie was set
            sameSite: 'None', // Adjust as necessary
        });
		res.status(200).json({ message: 'Signout successful' });
	} catch (error) {
		next(error);
	}
}

function authUser(req, res, next) {
	try {
		const token = req.cookies.token;
		if (token) {
			res.status(200).json({ message: 'Valid User' });
		} else {
			res.status(404).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		next(error);
	}
}

async function updateUser(req, res, next) {
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
}

module.exports = { createUser, signinUser, signoutUser, authUser, updateUser };
