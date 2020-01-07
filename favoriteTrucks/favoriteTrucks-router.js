const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const favoriteTrucks = require('./favoriteTrucks-model');

router.post('/', restricted, (req, res) => {
    let favorite = req.body;
    let dinerID = req.body.dinerID;

    favoriteTrucks.getById(dinerID)
        .then(favoriteArray => {
            var testVal = req.body.truckID;

            //checks the existing data in the table and only allows the favorite to be added if it doesn't already exist for the given user. The same truck can be favorited by multiple different users
            if (favoriteArray.some(favorite => favorite.truckID === testVal)) {
                res.status(401).json({ message: "This Truck was already added as a favorite" });
            } else {
                favoriteTrucks.add(favorite)
                    .then(() => {
                        favoriteTrucks.getById(dinerID)
                            .then(favoriteArray => {
                                res.status(201).json(favoriteArray)
                            })
                    })
            }
        })
})

router.get('/:id', restricted, (req, res) => {
    let id = req.params.id;

    favoriteTrucks.getById(id)
        .then(favorites => {
            res.status(200).json(favorites)
        })
        .catch(err => {
            res.status(500).json({ err, errorMessage: "unable to get the favorites" })
        })
})

router.delete('/', restricted, (req, res) => {
    let dinerID = req.body.dinerID;
    let truckID = req.body.truckID;

    favoriteTrucks.getById(dinerID)
        .then(favoriteArray => {

            if (favoriteArray.some(favorite => favorite.truckID === truckID)) {
                favoriteTrucks.remove(truckID)
                    .then(() => {
                        res.status(201).json({ message: "Favorite deleted successfully" })
                    })
            } else {
                res.status(404).json({ message: "Favorite not found" })
            }
        })

})

module.exports = router;