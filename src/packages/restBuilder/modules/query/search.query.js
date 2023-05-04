export class SearchQuery {
    static SEARCH_PATTERN = 'i';

    #rawSearchs;

    constructor(searchTransformed) {
        this.#rawSearchs = searchTransformed;
    }

    generate() {
        if (this.#rawSearchs) {
            const searchQuery = {
                value: `%${(this.#rawSearchs.value).toLowerCase()}%`,
                queries: []
            };

            this.#rawSearchs.criteria.forEach(searchField => {
                searchQuery.queries.push(`LOWER(${searchField}) LIKE ?`);
            });

            return searchQuery;
        }
        return null;
    }

    addSearchField(field) {
        this.#rawSearchs.criteria.push(field);
        return this;
    }

    addSearchValue(value) {
        this.#rawSearchs.value = value;
        return this;
    }

    addSearchValueSafety(value) {
        if (this.#rawSearchs.value) {
            throw new Error(`Value in ${SearchQuery.name} was set and can not modify by adding with method addSearchValueSafety`);
        }
        this.addSearchValue(value);
        return this;
    }
}
