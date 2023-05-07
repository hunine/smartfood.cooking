/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'recipes_images';

exports.up = async knex => {
    await knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable(tableName, table => {
            table.uuid('recipe_id').references('id').inTable('recipes').notNullable();
            table
                .uuid('image_id')
                .references('id')
                .inTable('images')
                .notNullable();
            table.primary(['recipe_id', 'image_id']);
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
