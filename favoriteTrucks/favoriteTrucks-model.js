const db = require('../database/dbConfig.js');

module.exports = {
    add,
    getById,
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

function getById(id) {
    return db
        .select()
        .from("dinerFavoriteTrucks")
        .where("dinerID", id)
        .orderBy("truckID");
}

function remove(id) {
    return db('dinerFavoriteTrucks')
        .where("truckID", id)
        .del();
}