const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const truckMenuItems = require('./truckMenuItems-model');

router.post('/', restricted, (req, res) => {
    let menuItem = req.body;
    let truckID = req.body.truckID;

    truckMenuItems.getById(truckID)
        .then(menuItemArray => {
            var testVal = req.body.menuItemID;

            if (menuItemArray.some(menuItem => menuItem.menuItemID === testVal)) {
                res.status(401).json({ message: "This menu item was already added" });
            } else {
                truckMenuItems.add(menuItem)
                    .then(() => {
                        truckMenuItems.getById(truckID)
                            .then(menuItemArray => {
                                res.status(201).json(menuItemArray)
                            })
                    })
            }
        })
})

router.get('/:id', restricted, (req, res) => {
    let id = req.params.id;

    truckMenuItems.getById(id)
        .then(menu => {
            if (menu.length > 0) {
                res.status(200).json(menu)
            } else {
                res.status(404).json({ message: "There are no menu items for that truck" })
            }
        })
        .catch(err => {
            res.status(500).json({ err, errorMessage: "unable to get the menu" })
        })
})

router.delete('/', restricted, (req, res) => {
    let truckID = req.body.truckID;
    let menuItemID = req.body.menuItemID;

    truckMenuItems.getById(truckID)
        .then(menuItemArray => {

            if (menuItemArray.some(menuItem => menuItem.menuItemID === menuItemID)) {
                truckMenuItems.remove(menuItemID)
                    .then(() => {
                        res.status(201).json({ message: "menuItem deleted successfully" })
                    })
            } else {
                res.status(404).json({ message: "menuItem not found" })
            }
        })

})

module.exports = router;