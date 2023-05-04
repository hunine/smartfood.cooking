/* eslint-disable no-await-in-loop */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import ingredients from '../data/ingredients.json';

exports.seed = knex => knex('ingredients')
    .del()
    .then(async () => {
        let data = [];
        for (let i = 0; i < ingredients.length; i += 1) {
            data.push(ingredients[i]);
            if ((i % 3000 === 0 && i !== 0) || i === ingredients.length - 1) {
                await knex('ingredients').insert(data);
                data = [];
            }
        }
    });
