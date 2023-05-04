/* eslint-disable no-await-in-loop */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import categories from '../data/categories.json';

exports.seed = knex => knex('categories')
    .del()
    .then(async () => {
        let data = [];
        for (let i = 0; i < categories.length; i += 1) {
            data.push(categories[i]);
            if ((i % 3000 === 0 && i !== 0) || i === categories.length - 1) {
                await knex('categories').insert(data);
                data = [];
            }
        }
    });
