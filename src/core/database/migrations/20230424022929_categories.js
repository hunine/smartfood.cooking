/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'categories';

exports.up = async knex => {
    await knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable(tableName, table => {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            table.string('name');
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
