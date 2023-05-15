/* eslint-disable no-await-in-loop */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import recipes from '../data/recipes.json';

exports.seed = knex => knex('recipes')
    .del()
    .then(async () => {
        let data = [];
        const level = {};

        (await knex('levels').select('id', 'name')).forEach(item => {
            level[item.name] = item.id;
        });

        for (let i = 0; i < recipes.length; i += 1) {
            recipes[i].level_id = level[recipes[i].level];
            delete recipes[i].level;

            data.push(recipes[i]);
            if ((i % 3000 === 0 && i !== 0) || i === recipes.length - 1) {
                await knex('recipes').insert(data);
                data = [];
            }
        }
    });
