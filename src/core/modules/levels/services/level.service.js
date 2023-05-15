import { DataPersistenceService } from 'packages/restBuilder/core/dataHandler/data.persistence.service';
import { LevelRepository } from '../repository/level.repository';

class Service extends DataPersistenceService {
    constructor() {
        super(LevelRepository);
    }
}

export const LevelService = new Service();
