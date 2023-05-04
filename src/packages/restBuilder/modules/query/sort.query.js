import { SortDirection } from 'packages/restBuilder/enum';

/**
 * @typedef SortFormat
 * @property {string} sort
 * @property {SortDirection} order
 */

export class SortQuery {
    /**
     * @type {SortFormat[]} rawSorts
     */
    #rawSorts;

    constructor(sortTransformed) {
        this.#rawSorts = sortTransformed;
    }

    generate() {
        const sortQuery = [];

        this.#rawSorts.forEach(sortItem => {
            sortQuery.push({ column: sortItem.sort, order: sortItem.order });
        });

        return sortQuery;
    }

    addSort(sort, order) {
        if (!SortDirection[order]) {
            throw new Error(`Invalid order added into addSort method from class ${SortQuery.name}`);
        }
        this.#rawSorts.push({
            sort,
            order
        });
        return this;
    }
}
