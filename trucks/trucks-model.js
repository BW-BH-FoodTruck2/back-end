const db = require('../database/dbConfig.js');

module.exports = {
    add,
    get,
    getById,
    update,
    remove
};

function add(truck) {
    return db('trucks')
        .insert(truck, "id")
        .then(ids => {
            const [id] = ids;
            return getById(id);
        });
}

function get() {
    return db
        .select()
        .from("trucks")
        .orderBy("id");
}

function getById(id) {
    return db
        .select()
        .from("trucks")
        .where({ id })
        .first();
}

function update(id, changes) {
    return db('trucks')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('trucks')
        .where('id', id)
        .del();
}