const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const Trucks = require('./trucks-model');

router.post('/', (req, res) => {
    let truck = req.body;
    Trucks.add(truck)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json({ err, errorMessage: "unable to add the truck" })
        })
})

router.get('/', (req, res) => {
    Trucks.get()
        .then(trucks => {
            res.status(200).json(trucks)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "unable to get the list of trucks" })
        })
})

router.get('/:id', (req, res) => {
    let id = req.params.id;

    Trucks.getById(id)
        .then(truck => {
            res.status(200).json(truck)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "unable to get the requested truck" })
        })
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let changes = req.body;

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
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    Trucks.remove(id)
        .then(() => {
            res.status(201).json({ message: "Successfully deleted truck" })
        })
        .catch(err => {
            res.status(500).json({ err, errorMessage: "unable to delete the truck" })
        })
})

module.exports = router;