import { DataPersistenceService } from 'packages/restBuilder/core/dataHandler/data.persistence.service';
import { CategoryRepository } from '../repository/category.repository';

class Service extends DataPersistenceService {
    constructor() {
        super(CategoryRepository);
    }
}

export const CategoryService = new Service();
