const db = require('../database/dbConfig.js');

module.exports = {
    add,
    getById,
    update,
    remove
};

function add(location) {
    return db('currentTruckLocation')
        .insert(location)
        .then(ids => {
            const [id] = ids;
            return getById(id);
        });
}

// function get() {
//     return db
//         .select()
//         .from("currentTruckLocation")
//         .orderBy("id");
// }

function getById(id) {
    return db
        .select()
        .from("currentTruckLocation")
        .where("truckID", id)
        .first();
}

function update(id, changes) {
    return db('currentTruckLocation')
        .where("truckID", id)
        .update(changes);
}

function remove(id) {
    return db('currentTruckLocation')
        .where("truckID", id)
        .del();
}