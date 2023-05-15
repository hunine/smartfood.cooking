import { DataPersistenceService } from 'packages/restBuilder/core/dataHandler/data.persistence.service';
import { CuisineRepository } from '../repository/cuisine.repository';

class Service extends DataPersistenceService {
    constructor() {
        super(CuisineRepository);
    }
}

export const CuisineService = new Service();
