const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const TruckLocation = require('./truckLocation-model');

router.post('/', (req, res) => {
    let location = req.body;
    let id = req.body.truckID;

    TruckLocation.getById(id)
        .then(existingLocation => {
            if (existingLocation) {
                res.status(401).json({ message: "there's already a location for this truck" })
            } else {
                TruckLocation.add(location)
                    .then(saved => {
                        res.status(201).json(saved);
                    })
                    .catch(err => {
                        res.status(500).json({ err, errorMessage: "unable to add the location" })
                    })
            }
        })

})

router.get('/:id', (req, res) => {
    let id = req.params.id;

    TruckLocation.getById(id)
        .then(location => {
            res.status(200).json(location)
        })
        .catch(err => {
            res.status(500).json({ err, errorMessage: "unable to get the requested location" })
        })
})

router.put('/:id', (req, res) => {
    let location = req.body;
    let id = req.params.id;

    TruckLocation.getById(id)
        .then(existingLocation => {
            if (existingLocation) {
                TruckLocation.update(id, location)
                    .then(() => {
                        TruckLocation.getById(id)
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

    TruckLocation.getById(id)
        .then(existingLocation => {
            if (existingLocation) {
                TruckLocation.remove(id)
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