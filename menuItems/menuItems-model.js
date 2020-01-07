const db = require('../database/dbConfig.js');

module.exports = {
    add,
    get,
    getById,
    update,
    remove
};

function add(menuItem) {
    return db('menuItems')
        .insert(menuItem, "id")
        .then(ids => {
            const [id] = ids;
            return getById(id);
        });
}

function get() {
    return db
        .select()
        .from("menuItems")
        .orderBy("id");
}

function getById(id) {
    return db
        .select()
        .from("menuItems")
        .where({ id })
        .first();
}

function update(id, changes) {
    return db('menuItems')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('menuItems')
        .where('id', id)
        .del();
}