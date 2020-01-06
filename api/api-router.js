const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const trucksRouter = require('../trucks/trucks-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/trucks', trucksRouter);

module.exports = router;