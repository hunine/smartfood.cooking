/* eslint-disable no-await-in-loop */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

import recipesIngredients from '../data/recipes_ingredients.json';

exports.seed = knex => knex('recipes_ingredients')
    .del()
    .then(async () => {
        let data = [];
        const recipes = {};
        const ingredients = {};

        (await knex('recipes').select('id', 'name')).forEach(item => {
            recipes[item.name] = item.id;
        });

        (await knex('ingredients').select('id', 'name')).forEach(item => {
            ingredients[item.name] = item.id;
        });

        for (let i = 0; i < recipesIngredients.length; i += 1) {
            recipesIngredients[i].recipe_id = recipes[recipesIngredients[i].recipe_name];
            recipesIngredients[i].ingredient_id = ingredients[recipesIngredients[i].ingredient_name];

            delete recipesIngredients[i].recipe_name;
            delete recipesIngredients[i].ingredient_name;

            data.push(recipesIngredients[i]);
            if ((i % 3000 === 0 && i !== 0) || i === recipesIngredients.length - 1) {
                await knex('recipes_ingredients').insert(data);
                data = [];
            }
        }
    });
