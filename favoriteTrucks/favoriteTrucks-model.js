const db = require('../database/dbConfig.js');

module.exports = {
    add,
    getById,
    update,
    remove
};

function add(location) {
    return db('dinerFavoriteTrucks')
        .insert(location)
        .then(ids => {
            const [id] = ids;
            return getById(id);
        });
}

// function get() {
//     return db
//         .select()
//         .from("dinerFavoriteTrucks")
//         .orderBy("id");
// }

function getById(id) {
    return db
        .select()
        .from("dinerFavoriteTrucks")
        .where("dinerID", id);
}

function update(id, changes) {
    return db('dinerFavoriteTrucks')
        .where("truckID", id)
        .update(changes);
}

function remove(id) {
    return db('dinerFavoriteTrucks')
        .where("truckID", id)
        .del();
}