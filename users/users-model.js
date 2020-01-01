const db = require('../database/dbConfig.js');

module.exports = {
    addDiner,
    getDiners,
    getDinersBy,
    getDinersById,
    getOperators,
    getOperatorsBy,
    addOperator,
    getAllUsers
};

function getAllUsers() {
    return db
        .select("id", "username")
        .from('diners', 'operators')
        .orderBy("id");
}

// -------Diner DB Access methods -----//
function getDiners() {
    return db("diners").select("id", "username").orderBy("id");
}

function getDinersBy(filter) {
    return db("diners")
        .select("id", "username")
        .where(filter);
}

function addDiner(user) {
    return db("diners")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return getDinersById(id);
        });
}

function getDinersById(id) {
    return db("diners")
        .select("id", "username")
        .where({ id })
        .first();
}

// -------Operator DB Access methods -----//
function getOperators() {
    return db("operators").select("id", "username").orderBy("id");
}

function getOperatorsBy(filter) {
    return db("operators")
        .select("id", "username")
        .where(filter);
}

function addOperator(user) {
    return db("operators")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return getOperatorsById(id);
        });
}

function getOperatorsById(id) {
    return db("operators")
        .select("id", "username")
        .where({ id })
        .first();
}