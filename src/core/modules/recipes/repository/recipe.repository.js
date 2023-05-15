import { DataRepository } from 'packages/restBuilder/core/dataHandler';

class Repository extends DataRepository {
    findById(id) {
        return this.query()
            .innerJoin('recipes_images', 'recipes.id', 'recipes_images.recipe_id')
            .innerJoin('images', 'recipes_images.image_id', 'images.id')
            .leftJoin('levels', 'recipes.level_id', 'levels.id')
            .whereNull('recipes.deleted_at')
            .whereRaw(`recipes.id::text = '${id}'`)
            .select(
                'recipes.id',
                'recipes.name',
                'levels.name as level',
                'images.url as image_url',
                'recipes.description',
                'recipes.deleted_at',
                'recipes.created_at',
                'recipes.updated_at',
            )
            .first();
    }

    findByIngredientIds(ingredientsId) {
        return this.query()
            .innerJoin(
                'recipes_ingredients',
                'recipes.id',
                'recipes_ingredients.recipe_id',
            )
            .innerJoin(
                'ingredients',
                'recipes_ingredients.ingredient_id',
                'ingredients.id',
            )
            .leftJoin('levels', 'recipes.level_id', 'levels.id')
            .whereNull('recipes.deleted_at')
            .whereIn('ingredients.id', ingredientsId)
            .select(
                'recipes.id',
                'recipes.name',
                'levels.name as level',
                'recipes.description',
                'recipes.deleted_at',
                'recipes.created_at',
                'recipes.updated_at',
            )
            .groupByRaw('recipes.id, levels.id')
            .orderByRaw('count(ingredients.id) desc');
    }
}

export const RecipeRepository = new Repository('recipes');
