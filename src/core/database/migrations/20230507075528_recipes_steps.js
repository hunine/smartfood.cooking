/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'recipes_steps';

exports.up = async knex => {
    await knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable(tableName, table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            table
                .uuid('recipe_id')
                .references('id')
                .inTable('recipes')
                .onDelete('CASCADE')
                .notNullable();
            table.string('content', 2500);
            table.integer('order').unsigned();
            table.dateTime('deleted_at').defaultTo(null);
            table.timestamps(false, true);
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
