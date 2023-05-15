import { DataPersistenceService } from 'packages/restBuilder/core/dataHandler/data.persistence.service';
import { IngredientRepository } from '../repository/ingredient.repository';

class Service extends DataPersistenceService {
    constructor() {
        super(IngredientRepository);
    }
}

export const IngredientService = new Service();
