const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const trucksRouter = require('../trucks/trucks-router.js');
const truckLocationRouter = require('../truckLocation/truckLocation-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/trucks', trucksRouter);
router.use('/location', truckLocationRouter);

module.exports = router;