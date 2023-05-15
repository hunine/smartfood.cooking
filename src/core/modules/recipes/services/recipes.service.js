import { Optional } from 'core/utils';
import { NotFoundException } from 'packages/httpException';
import { DataPersistenceService } from 'packages/restBuilder/core/dataHandler/data.persistence.service';

const { RecipeRepository } = require('../repository/recipe.repository');

class Service extends DataPersistenceService {
    constructor() {
        super(RecipeRepository);
    }

    async findById(id) {
        const data = Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException())
            .get();

        return data;
    }

    async findByIngredientIds(ingredientsId) {
        const data = Optional.of(
            await this.repository.findByIngredientIds(ingredientsId),
        )
            .throwIfNotPresent(new NotFoundException())
            .get();

        return data;
    }
}

export const RecipeService = new Service();
