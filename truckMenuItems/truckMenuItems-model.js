const db = require('../database/dbConfig.js');

module.exports = {
    add,
    getById,
    remove
};

function add(item) {
    return db('truckMenuItems')
        .insert(item)
        .then(ids => {
            const [id] = ids;
            return getById(id);
        });
}

function getById(id) {
    return db
        .select()
        .from("truckMenuItems")
        .where("truckID", id);
}

function remove(id) {
    return db('truckMenuItems')
        .where("menuItemID", id)
        .del();
}