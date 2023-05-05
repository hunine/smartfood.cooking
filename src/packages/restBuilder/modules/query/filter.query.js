import { FilterFactory } from '../factory/filter.factory';

export class FilterQuery {
    #rawFilters;

    constructor(filterTransformed) {
        this.#rawFilters = filterTransformed;
    }

    generate() {
        return this.#rawFilters;
    }

    addFilter(column, sign, value) {
        FilterFactory.filterValidator.validate([column, sign, value]);
        this.#rawFilters.push({
            column,
            sign,
            value
        });
        return this;
    }
}
