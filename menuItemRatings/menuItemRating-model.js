const db = require('../database/dbConfig.js');

module.exports = {
    add,
    getById
};

function add(rating) {
    return db("menuItemRatings")
        .insert(rating)
        .then(ids => {
            const [id] = ids;
            return getById(id);
        });
}

function getById(id) {
    return db
        .select()
        .from("menuItemRatings")
        .where("menuItemID", id)
        .orderBy("rating");
}

// function update(id, changes) {
//     return db('menuItemRatings')
//         .where("truckID", id)
//         .update(changes);
// }

// function remove(id) {
//     return db('menuItemRatings')
//         .where("truckID", id)
//         .del();
// }