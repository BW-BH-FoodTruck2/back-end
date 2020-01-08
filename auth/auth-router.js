const bcrypt = require('bcryptjs');
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    if (user.role === 1) {
        delete user["role"];
        Users.addDiner(user)
            .then(saved => {
                res.status(201).json(saved);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    } else if (user.role === 2) {
        delete user["role"];
        Users.addOperator(user)
            .then(saved => {
                res.status(201).json(saved);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

});

router.post('/login', (req, res) => {
    let { username, password, role } = req.body;

    if (role === 1) {
        Users.getDinersBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {

                    function signToken(user) {
                        const payload = {
                            username: user.username,
                            role: 1
                        };

                        const secret = process.env.JWT_SECRET;

                        const options = {
                            expiresIn: "24h",
                        };

                        return jwt.sign(payload, secret, options);
                    }
                    const token = signToken(user);

                    res.status(200).json({
                        token,
                        id: user.id,
                        message: `Welcome ${user.username}!`
                    });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });

    } else if (role === 2) {
        Users.getOperatorsBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {

                    function signToken(user) {
                        const payload = {
                            username: user.username,
                            role: 2
                        };

                        const secret = process.env.JWT_SECRET;

                        const options = {
                            expiresIn: "24h",
                        };

                        return jwt.sign(payload, secret, options);
                    }
                    const token = signToken(user);

                    res.status(200).json({
                        token,
                        id: user.id,
                        message: `Welcome ${user.username}!`
                    });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
});

// function signToken(user) {
//     const payload = {
//         username: user.username,
//         role: role
//     };

//     const secret = process.env.JWT_SECRET || "This is the secret";

//     const options = {
//         expiresIn: "24h",
//     };

//     return jwt.sign(payload, secret, options);
// }

// router.get('/logout', (req, res) => {
//     if (req.session) {
//         req.session.destroy(err => {
//             if (err) {
//                 res.json({ message: 'You can checkout any time you like, but you never can leave' })
//             } else {
//                 res.status(200).json({ message: "bye, thanks for playing!" })
//             }
//         })
//     } else {
//         res.status(200).json({ message: "You were never here to begin with" })
//     }
// })

module.exports = router;