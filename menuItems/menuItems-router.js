const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const menuItems = require('./menuItems-model');

router.post('/', (req, res) => {
    let item = req.body;

    menuItems.add(item)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json({ err, errorMessage: "unable to add the menuItem" })
        })
})

router.get('/', (req, res) => {
    menuItems.get()
        .then(menuItems => {
            res.status(200).json(menuItems)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "unable to get the list of menuItems" })
        })
})

router.get('/:id', (req, res) => {
    let id = req.params.id;

    menuItems.getById(id)
        .then(menuItem => {
            if (menuItem) {
                res.status(200).json(menuItem)
            } else {
                res.status(404).json({ message: "menu item not found" })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "unable to get the requested menuItem" })
        })
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let changes = req.body;

    menuItems.update(id, changes)
        .then(() => {
            menuItems.getById(id)
                .then(menuItem => {
                    res.status(200).json(menuItem)
                })
        })
        .catch(err => {
            res.status(500).json({ err, errorMessage: "unable to update the menuItem" })
        })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    menuItems.getById(id)
        .then(menuItem => {
            if (menuItem) {
                menuItems.remove(id)
                    .then(() => {
                        res.status(201).json({ message: "Successfully deleted menuItem" })
                    })
                    .catch(err => {
                        res.status(500).json({ err, errorMessage: "unable to delete the menuItem" })
                    })
            } else {
                res.status(404).json({ message: "menu item not found" })
            }
        })
})

module.exports = router;