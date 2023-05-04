import { Optional } from 'core/utils';
import { NotFoundException } from 'packages/httpException';

const { RecipeRepository } = require('../repository/recipe.repository');

class Service {
    constructor() {
        this.repository = RecipeRepository;
    }

    async findById(id) {
        const data = Optional.of(await this.repository.findById(id))
            .throwIfNotPresent(new NotFoundException())
            .get();

        return data;
    }
}

export const RecipeService = new Service();
