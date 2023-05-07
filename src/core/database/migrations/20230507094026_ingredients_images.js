/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'ingredients_images';

exports.up = async knex => {
    await knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable(tableName, table => {
            table
                .uuid('ingredient_id')
                .references('id')
                .inTable('ingredients')
                .notNullable();
            table.uuid('image_id').references('id').inTable('images').notNullable();
            table.primary(['ingredient_id', 'image_id']);
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
