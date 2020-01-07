const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const favoriteTrucks = require('./favoriteTrucks-model');

router.post('/', (req, res) => {
    let favorite = req.body;
    let dinerID = req.body.dinerID;

    favoriteTrucks.getById(dinerID)
        .then(favoriteArray => {
            var testVal = req.body.truckID;

            //checks the existing data in the table and only allows the favorite to be added if it doesn't already exist for the given user. The same truck can be favorited by multiple different users
            if (favoriteArray.some(favorite => favorite.truckID === testVal)) {
                console.log("made it to the if")
                res.status(401).json({ message: "This Truck was already added as a favorite" });
            } else {
                console.log("made it to the else if")
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

router.get('/:id', (req, res) => {
    let id = req.params.id;

    favoriteTrucks.getById(id)
        .then(favorites => {
            res.status(200).json(favorites)
        })
        .catch(err => {
            res.status(500).json({ err, errorMessage: "unable to get the favorites" })
        })
})

router.put('/:id', (req, res) => {
    let location = req.body;
    let id = req.params.id;

    favoriteTrucks.getById(id)
        .then(existingLocation => {
            if (existingLocation) {
                favoriteTrucks.update(id, location)
                    .then(() => {
                        favoriteTrucks.getById(id)
                            .then(updatedLocation => {
                                res.status(201).json(updatedLocation)
                            })
                    })
                    .catch(err => {
                        res.status(500).json({ err, errorMessage: "unable to update the location" })
                    })
            } else {
                res.status(404).json({ message: "the requested truck either doesn't exist, or doesn't have a location saved" })
            }
        })

})

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    favoriteTrucks.getById(id)
        .then(existingLocation => {
            if (existingLocation) {
                favoriteTrucks.remove(id)
                    .then(() => {
                        res.status(201).json({ message: "Location data deleted successfully" })
                    })
                    .catch(err => {
                        res.status(500).json({ err, errorMessage: "unable to delete the location" })
                    })
            } else {
                res.status(404).json({ message: "the requested truck either doesn't exist, or doesn't have a location saved" })
            }
        })

})

module.exports = router;