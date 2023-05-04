import { DataRepository } from 'packages/restBuilder/core/dataHandler';

class Repository extends DataRepository {
    findById(id) {
        return this.query()
            .whereNull('recipes.deleted_at')
            .where('recipes.id', '=', id)
            .select()
            .first();
    }
}

export const RecipeRepository = new Repository('recipes');
