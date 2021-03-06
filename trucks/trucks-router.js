const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const Trucks = require('./trucks-model');

router.post('/', restricted, (req, res) => {
    let truck = req.body;

    Trucks.get()
        .then(trucks => {
            if (trucks.some(aTruck => aTruck.truckName === truck.truckName)) {
                res.status(401).json({ message: "This truck name already exists" });
            } else {
                Trucks.add(truck)
                    .then(saved => {
                        res.status(201).json(saved);
                    })
                    .catch(err => {
                        res.status(500).json({ err, errorMessage: "unable to add the truck" })
                    })
            }
        })

})

router.get('/', restricted, (req, res) => {
    Trucks.get()
        .then(trucks => {
            res.status(200).json(trucks)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "unable to get the list of trucks" })
        })
})

router.get('/:id', restricted, (req, res) => {
    let id = req.params.id;

    Trucks.getById(id)
        .then(truck => {
            res.status(200).json(truck)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "unable to get the requested truck" })
        })
})

router.put('/:id', restricted, (req, res) => {
    let id = req.params.id;
    let changes = req.body;

    Trucks.getById(id)
        .then(truck => {
            if (truck) {
                Trucks.update(id, changes)
                    .then(() => {
                        Trucks.getById(id)
                            .then(truck => {
                                res.status(200).json(truck)
                            })
                    })
                    .catch(err => {
                        res.status(500).json({ err, errorMessage: "unable to update the truck" })
                    })
            } else {
                res.status(404).json({ message: "There is no truck by that ID." })
            }
        })

})

router.delete('/:id', restricted, (req, res) => {
    let id = req.params.id;

    Trucks.getById(id)
        .then(truck => {
            if (truck) {
                Trucks.remove(id)
                    .then(() => {
                        res.status(201).json({ message: "Successfully deleted truck" })
                    })
                    .catch(err => {
                        res.status(500).json({ err, errorMessage: "unable to delete the truck" })
                    })
            } else {
                res.status(404).json({ message: "There is no truck by that ID. It either doesn't exist or was already deleted" })
            }
        })

})

module.exports = router;