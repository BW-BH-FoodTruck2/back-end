const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const truckRatings = require('./truckRating-model');

router.post('/', (req, res) => {
    let body = req.body;
    let rating = req.body.rating;

    if (rating > 0 && rating < 6) {
        truckRatings.add(body)
            .then(() => {
                res.status(201).json(rating)
            })
            .catch(err => {
                res.status(500).json({ err, errorMessage: "unable to add the rating" })
            })
    }

})

router.get('/:id', (req, res) => {
    let id = req.params.id;

    truckRatings.getById(id)
        .then(ratings => {
            if (ratings.length > 0) {
                res.status(201).json(ratings)
            } else {
                res.status(404).json({ message: "There are no ratings for this truck" })
            }
        })
        .catch(err => {
            res.status(500).json({ err, errorMessage: "unable to get the rating(s)" })
        })
})

module.exports = router;