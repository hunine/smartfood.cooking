const { DataRepository } = require('packages/restBuilder/core/dataHandler');

class Repository extends DataRepository {

}

export const CategoryRepository = new Repository('categories');
