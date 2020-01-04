
exports.up = function (knex) {
    return knex.schema
        .createTable("diners", diners => {
            diners.increments();

            diners.string("username", 128)
                .notNullable()
                .unique();

            diners.string("password", 128).notNullable();

            diners.string("location", 256);
        })
        .createTable("operators", operators => {
            operators.increments();

            operators.string("username", 128)
                .notNullable()
                .unique();

            operators.string("password", 128).notNullable();
        })
        .createTable("dinerFavoriteTrucks", table => {
            table.integer("dinerID")
                .unsigned()
                .notNullable();

            table.foreign("dinerID")
                .references("diners.id")

            table.integer("truckID")
                .unsigned()
                .notNullable();

            table.foreign("truckID")
                .references("trucks.id")
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("users")
        .dropTableIfExists("roles");
};
