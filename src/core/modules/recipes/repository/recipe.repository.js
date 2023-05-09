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
}

export const RecipeRepository = new Repository('recipes');
