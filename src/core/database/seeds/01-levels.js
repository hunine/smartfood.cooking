/* eslint-disable no-await-in-loop */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import levels from '../data/levels.json';

exports.seed = knex => knex('levels')
    .del()
    .then(async () => {
        let data = [];
        for (let i = 0; i < levels.length; i += 1) {
            data.push(levels[i]);
            if ((i % 3000 === 0 && i !== 0) || i === levels.length - 1) {
                await knex('levels').insert(data);
                data = [];
            }
        }
    });
