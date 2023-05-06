import { DataRepository } from 'packages/restBuilder/core/dataHandler';

class Repository extends DataRepository {
    findById(id) {
        return this.query()
            .whereNull('recipes.deleted_at')
            .whereRaw(`recipes.id::text = '${id}'`)
            .select()
            .first();
    }
}

export const RecipeRepository = new Repository('recipes');
