const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const Users = require('./users-model.js');

router.get('/', restricted, (req, res) => {
    Users.getDiners()
        .then(diners => {
            Users.getOperators()
                .then(operators => {
                    operators.map(operator => {
                        diners.push(operator)
                    })
                    res.status(200).json(diners)
                })
        })
        .catch(err => res.send(err));
});

router.get('/:id', restricted)

module.exports = router;