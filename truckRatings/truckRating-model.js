const db = require('../database/dbConfig.js');

module.exports = {
    add,
    getById
};

function add(rating) {
    return db("truckRatings")
        .insert(rating)
        .then(ids => {
            const [id] = ids;
            return getById(id);
        });
}

function getById(id) {
    return db
        .select()
        .from("truckRatings")
        .where("truckID", id)
        .orderBy("rating");
}

// function update(id, changes) {
//     return db('truckRatings')
//         .where("truckID", id)
//         .update(changes);
// }

// function remove(id) {
//     return db('truckRatings')
//         .where("truckID", id)
//         .del();
// }