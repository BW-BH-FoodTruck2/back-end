
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
        .createTable("currentTruckLocation", table => {
            table.integer("truckID")
                .unsigned()
                .notNullable();

            table.foreign("truckID")
                .references("trucks.id");

            table.string("location", 512)
                .notNullable();

            table.dateTime("departureTime")
        })
        .createTable("truckRatings", table => {
            table.integer("truckID")
                .unsigned()
                .notNullable();

            table.foreign("truckID")
                .references("trucks.id");

            table.integer("rating")
                .notNullable();
        })
        .createTable("menuItems", table => {
            table.increments();

            table.string("itemName", 128)
                .notNullable()
                .unique();

            table.string("itemDescription", 256)

            table.float("itemPrice")
                .notNullable();
        })
        .createTable("truckMenuItems", table => {
            table.integer("truckID")
                .unsigned()
                .notNullable();

            table.foreign("truckID")
                .references("trucks.id");

            table.integer("menuItemID")
                .unsigned()
                .notNullable();

            table.foreign("menuItemID")
                .references("menuItems.id");
        })
        .createTable("menuItemRatings", table => {
            table.integer("menuItemID")
                .unsigned()
                .notNullable();

            table.foreign("menuItemID")
                .references("menuItems.id");

            table.integer("rating")
                .notNullable();
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("currentTruckLocation")
        .dropTableIfExists("truckRatings")
        .dropTableIfExists("menuItems")
        .dropTableIfExists("truckMenuItems")
        .dropTableIfExists("menuItemRatings")
        .dropTableIfExists("trucks")
};
