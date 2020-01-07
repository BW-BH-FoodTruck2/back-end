const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const trucksRouter = require('../trucks/trucks-router.js');
const truckLocationRouter = require('../truckLocation/truckLocation-router.js');
const favoriteTrucksRouter = require('../favoriteTrucks/favoriteTrucks-router.js');
const truckRatings = require('../truckRatings/truckRating-router.js');
const menuItems = require('../menuItems/menuItems-router.js');
const truckMenuItems = require('../truckMenuItems/truckMenuItems-router.js');
const menuItemRatings = require('../menuItemRatings/menuItemRating-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/trucks', trucksRouter);
router.use('/location', truckLocationRouter);
router.use('/favoritetrucks', favoriteTrucksRouter);
router.use('/truckratings', truckRatings);
router.use('/menuitems', menuItems);
router.use('/truckmenuitems', truckMenuItems);
router.use('/menuitemratings', menuItemRatings);

module.exports = router;