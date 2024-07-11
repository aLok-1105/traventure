const {Router} = require('express');
const { validateToken1 } = require('../services/authentication');
const { createUser, signinUser, signoutUser, authUser, updateUser } = require('../controllers/user');

const router = Router();

router.post('/signup', createUser)

router.post('/signin', signinUser)

router.post('/signout', signoutUser)

router.get('/auth', authUser)

router.put('/update/:id', validateToken1, updateUser);


module.exports = router