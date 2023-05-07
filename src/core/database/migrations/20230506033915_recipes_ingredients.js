/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'recipes_ingredients';

exports.up = async knex => {
    await knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable(tableName, table => {
            table.uuid('recipe_id').references('id').inTable('recipes').notNullable();
            table
                .uuid('ingredient_id')
                .references('id')
                .inTable('ingredients')
                .notNullable();
            table.string('value', 1000).nullable();
            table.string('unit', 1000);
            table.primary(['recipe_id', 'ingredient_id']);
        });

    await knex.raw(`
   CREATE TRIGGER update_timestamp
   BEFORE UPDATE
   ON ${tableName}
   FOR EACH ROW
   EXECUTE PROCEDURE update_timestamp();
 `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable(tableName);
