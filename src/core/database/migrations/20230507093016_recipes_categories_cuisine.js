/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'recipes_categories_cuisine';

exports.up = async knex => {
    await knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable(tableName, table => {
            table.uuid('recipe_id').references('id').inTable('recipes').notNullable();
            table
                .uuid('category_id')
                .references('id')
                .inTable('categories')
                .notNullable();
            table
                .uuid('cuisine_id')
                .references('id')
                .inTable('cuisine')
                .notNullable();
            table.primary(['recipe_id', 'category_id', 'cuisine_id']);
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
