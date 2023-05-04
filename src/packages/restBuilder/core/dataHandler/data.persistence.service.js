import { Pageable } from 'packages/restBuilder/core/pageable';
import { FilterQuery } from 'packages/restBuilder/modules/query/filter.query';
import { PaginationQuery } from 'packages/restBuilder/modules/query/pagination.query';
import { SearchQuery } from 'packages/restBuilder/modules/query/search.query';
import { SortQuery } from 'packages/restBuilder/modules/query/sort.query';
import { DataRepository } from './data.repository';

export class DataPersistenceService {
    /**
     * @type {import('./data.repository').DataRepository}
     */
    repository;

    constructor(repository) {
        if (!(repository instanceof DataRepository)) {
            throw new Error('Extended class DataPersistenceService should be constructed with DataRepository instance');
        }
        this.repository = repository;
    }

    /**
     * 
     * @param {import('../requestTransformer/RequestTransformer').RequestTransformer} requestTransformer 
     */
    async getAndCount(requestTransformer) {
        const data = await this.repository.getAndCount(
            new PaginationQuery(requestTransformer.content.pagination),
            new FilterQuery(requestTransformer.content.filters),
            new SortQuery(requestTransformer.content.sorts),
            new SearchQuery(requestTransformer.content.search),
            requestTransformer.content.main,
            requestTransformer.content.associates,
            requestTransformer.content.notDeleted
        );

        return Pageable.of(data, requestTransformer.content.pagination).build();
    }

    get(requestTransformer) {
        return this.repository.get(
            new PaginationQuery(requestTransformer.content.pagination),
            new FilterQuery(requestTransformer.content.filters),
            new SortQuery(requestTransformer.content.sorts),
            new SearchQuery(requestTransformer.content.search),
            requestTransformer.content.main,
            requestTransformer.content.associates
        );
    }
}
