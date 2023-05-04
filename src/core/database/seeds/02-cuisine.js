/* eslint-disable no-await-in-loop */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import cuisine from '../data/cuisine.json';

exports.seed = knex => knex('cuisine')
    .del()
    .then(async () => {
        let data = [];
        for (let i = 0; i < cuisine.length; i += 1) {
            data.push(cuisine[i]);
            if ((i % 3000 === 0 && i !== 0) || i === cuisine.length - 1) {
                await knex('cuisine').insert(data);
                data = [];
            }
        }
    });
