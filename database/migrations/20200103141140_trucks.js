
exports.up = function (knex) {
    return knex.schema
        .createTable("trucks", trucks => {
            trucks.increments();

            trucks.string("truckName", 128)
                .notNullable()
                .unique();

            trucks.string("imageURL", 128)

            trucks.string("cuisineType", 256)
                .notNullable();

            trucks.integer("operatorID")
                .unsigned()
                .notNullable();

            trucks.foreign("operatorID").references("operators.id")
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("trucks")
};
