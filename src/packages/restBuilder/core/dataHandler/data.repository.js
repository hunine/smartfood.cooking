import connection from 'core/database';
import { logger } from 'core/utils';
import { camelCase, upperFirst } from 'lodash';
import { QueryBuilder } from 'packages/restBuilder/core/queryBuilder/queryBuilder';
import { BUILDER_TYPE } from 'packages/restBuilder/enum/buildType.enum';
import { parallel } from 'packages/taskExecution';

export class DataRepository {
    #table;

    #connection;

    constructor(tableName) {
        this.#table = tableName;
        this.#connection = connection;
        logger.info(`[${upperFirst(camelCase(this.#table))}Repository] is bundling`);
    }

    query() {
        return this.#connection(this.#table).clone();
    }

    /**
     * @param {import('../../modules/query/pagination.query').PaginationQuery} pagination 
     * @param {import('../../modules/query/filter.query').FilterQuery} filter 
     * @param {import('../../modules/query/sort.query').SortQuery} sort 
     * @param {import('../../modules/query/search.query').SearchQuery[]} search 
     * @param {import('mongoose').PopulateOptions} associates
     * @returns {import('../queryBuilder/queryBuilder').QueryBuilder}
     * @param {import('../../enum/buildType.enum').BUILDER_TYPE} querySelector
     */
    getTemplateQuery(pagination, filter, sort, search, main, associates,
        notDeleted, querySelector = BUILDER_TYPE.SELECT) {
        return QueryBuilder
            .builder(this.query())[querySelector]()
            .addFilter(filter)
            .addPagination(pagination)
            .addSearch(search)
            .addSort(sort)
            .setMain(main)
            .setAssociates(associates)
            .setNotDeleted(notDeleted);
    }

    getAndCount(pagination, filter, sort, search, main, associates, notDeleted) {
        const baseQuery = this.getTemplateQuery(pagination, filter, sort, search, main, associates, notDeleted);
        return parallel([
            baseQuery,
            QueryBuilder.builder(this.query(), baseQuery)
                .countRecords()
                .clearPagination()
        ], task => task.run());
    }

    get(pagination, filter, sort, search, main, associates, notDeleted) {
        return this.getTemplateQuery(pagination, filter, sort, search, main, associates, notDeleted).run();
    }

    getWithFilter(filter, main, associates, notDeleted) {
        return this.getTemplateQuery(null, filter, null, null, main, associates, notDeleted).run();
    }

    getWithSort(sort, main, associates, notDeleted) {
        return this.getTemplateQuery(null, null, sort, null, main, associates, notDeleted).run();
    }

    /**
     *
     * @param {import('../../modules/query/search.query').SearchQuery} searchQuery 
     * @param {import('mongoose').PopulateOptions[]} associates
     */
    search(searchQuery, main, associates) {
        return this.getTemplateQuery(null, null, null, searchQuery, main, associates).run();
    }

    /**
     * =======================================================================
     * ==============       Shortcut of model method           ===============
     * =======================================================================
     */

    insert(data = {}, trx = null, columns = 'id') {
        const queryBuilder = this.query().insert(data, columns);
        if (trx) queryBuilder.transacting(trx);
        return queryBuilder;
    }

    update(id, data = {}, trx = null) {
        const queryBuilder = this.query().whereNull('deleted_at').where({ id }).update(data);
        if (trx) queryBuilder.transacting(trx);
        return queryBuilder;
    }

    permanentlyDeleteMany(ids, trx = null) {
        const queryBuilder = this.query().whereIn('id', ids).delete();
        if (trx) queryBuilder.transacting(trx);
        return queryBuilder;
    }

    softDeleteMany(ids, trx = null) {
        const queryBuilder = this.query().whereIn('id', ids).update({ deleted_at: this.#connection.fn.now() }, 'id');
        if (trx) queryBuilder.transacting(trx);
        return queryBuilder;
    }

    restore(ids, trx = null, columns = 'id') {
        const queryBuilder = this.query().whereIn('id', ids).update({ deleted_at: null }, columns);
        if (trx) queryBuilder.transacting(trx);
        return queryBuilder;
    }

    findTrashed() {
        return this.query().whereNotNull('deleted_at');
    }
}
