/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import { BUILDER_TYPE } from 'packages/restBuilder/enum/buildType.enum';
import { FilterQuery } from 'packages/restBuilder/modules/query/filter.query';
import { PaginationQuery } from 'packages/restBuilder/modules/query/pagination.query';
import { SearchQuery } from 'packages/restBuilder/modules/query/search.query';
import { SortQuery } from 'packages/restBuilder/modules/query/sort.query';

export class QueryBuilder {
    /**
     * @type {import('../dataHandler/data.repository').query().select()}
     */
    #queryBuilder;

    #buildType;

    #limit;

    #offset;

    #filterDocuments = [];

    #sortDocument = [];

    #searchDocument = {};

    #main;

    #associates = [];

    #notDeleted = [];

    constructor(query) {
        this.#queryBuilder = query;
    }

    static builder(queryBuilder, baseQueryBuilder) {
        const newIntance = new QueryBuilder();
        newIntance.#queryBuilder = queryBuilder;
        if (baseQueryBuilder) {
            const queryDocument = baseQueryBuilder.getQueryDocument();
            newIntance.#filterDocuments = queryDocument.filterDocument;
            newIntance.#sortDocument = queryDocument.sortDocument;
            newIntance.#searchDocument = queryDocument.searchDocument;
            newIntance.#limit = queryDocument.limit;
            newIntance.#offset = queryDocument.offset;
        }
        return {
            select: newIntance.#init(BUILDER_TYPE.SELECT),
            countRecords: newIntance.#init(BUILDER_TYPE.COUNT),
        };
    }

    #init = buildType => () => {
        this.#buildType = buildType;
        return this;
    };

    getQueryDocument() {
        return {
            limit: this.#limit,
            offset: this.#offset,
            filterDocument: this.#filterDocuments,
            sortDocument: this.#sortDocument,
            searchDocument: this.#searchDocument,
        };
    }

    setMain(main) {
        this.#main = main;
        return this;
    }

    setAssociates(associates) {
        if (Array.isArray(associates) && associates.length > 0) {
            this.#associates = associates;
        }
        return this;
    }

    setNotDeleted(fields) {
        if (Array.isArray(fields) && fields.length > 0) {
            this.#notDeleted = fields;
        }
        return this;
    }

    /**
     * @param {number} offset
     */
    addOffset(offset) {
        this.#offset = offset;
        return this;
    }

    /**
     * @param {number} offset
     */
    addLimit(limit) {
        this.#limit = limit;
        return this;
    }

    /**
     * @param {number} offset
     * @param {number} limit
     */
    addOffsetAndLimit(offset, limit) {
        this.#offset = offset;
        this.#limit = limit;
        return this;
    }

    /**
     * @param {typeof import('../../modules/query/pagination.query').PaginationQuery} pagination
     */
    addPagination(pagination) {
        if (pagination) {
            if (!(pagination instanceof PaginationQuery)) {
                throw new Error(`Call method addPagination of QueryBuilder with param is not an instance of ${PaginationQuery.name}`);
            }
            this.#limit = pagination.limit;
            this.#offset = pagination.offset;
        }

        return this;
    }

    /**
     * @param {typeof import('../../modules/query/filter.query').FilterQuery} filter
     */
    addFilter(filter) {
        if (filter) {
            if (!(filter instanceof FilterQuery)) {
                throw new Error(`Call method addFilter of QueryBuilder with param is not an instance of ${FilterQuery.name}`);
            }
            this.#filterDocuments = filter.generate();
        }

        return this;
    }

    /**
     * @param {typeof import('../../modules/query/search.query').SearchQuery} search
     */
    addSearch(search) {
        if (search) {
            if (!(search instanceof SearchQuery)) {
                throw new Error(`Call method addSearch of QueryBuilder with param is not an instance of ${SearchQuery.name}`);
            }
            this.#searchDocument = search.generate();
        }
        return this;
    }

    /**
     * @param {typeof import('../../modules/query/sort.query').SortQuery} sort
     */
    addSort(sort) {
        if (sort) {
            if (!(sort instanceof SortQuery)) {
                throw new Error(`Call method addSort of QueryBuilder with param is not an instance of ${SortQuery.name}`);
            }
            this.#sortDocument = sort.generate();
        }
        return this;
    }

    clearPagination() {
        this.#limit = null;
        this.#offset = null;
        return this;
    }

    clearOffset() {
        this.#offset = null;
        return this;
    }

    clearLimit() {
        this.#limit = null;
        return this;
    }

    clearFilters() {
        this.#filterDocuments.splice(0, this.#filterDocuments.length);
        this.#filterDocuments = [];
        return this;
    }

    removeFilter(column) {
        for (let i = 0; i < this.#filterDocuments.length; i += 1) {
            if (this.#filterDocuments[i].column === column) {
                this.#filterDocuments.slice(0, 1);
            }
        }
        return this;
    }

    removeSort(column) {
        for (let i = 0; i < this.#sortDocument.length; i += 1) {
            if (this.#sortDocument[i].column === column) {
                this.#sortDocument.slice(0, 1);
            }
        }
        return this;
    }

    run() {
        if (this.#limit) {
            if (Number.isNaN(this.#limit)) {
                throw new Error('Limit is set into query builder is not a number');
            }
            this.#queryBuilder.limit(this.#limit);
        }

        if (this.#offset || this.#offset === 0) {
            if (Number.isNaN(this.#offset)) {
                throw new Error('Offset is set into query builder is not a number');
            }

            this.#queryBuilder.offset(this.#offset);
        }

        if (this.#associates.length > 0) {
            this.#associates.forEach(associate => {
                this.#queryBuilder.innerJoin(associate[0], associate[1], associate[2]);
            });
        }

        if (this.#buildType === BUILDER_TYPE.COUNT) {
            this.#queryBuilder[this.#buildType]('*').first();
        } else {
            this.#queryBuilder[this.#buildType](...this.#main);
            if (this.#searchDocument) {
                const searchValue = this.#searchDocument.value;
                this.#searchDocument?.queries.forEach(searchQuery => {
                    this.#queryBuilder.where(function () {
                        this.orWhereRaw(searchQuery, searchValue);
                    });
                });
            }

            this.#queryBuilder.orderBy(this.#sortDocument);
            if (this.#buildType === BUILDER_TYPE.COUNT) {
                return this.#queryBuilder;
            }
        }

        this.#notDeleted.forEach(table => {
            this.#queryBuilder.whereNull(`${table}.deleted_at`);
        });

        this.#filterDocuments.forEach(filter => {
            this.#queryBuilder.where(filter.column, filter.sign, filter.value);
        });

        return this.#queryBuilder;
    }
}
