/**
 * @notes
 - This class is a builder
 - It help us to return a format of pagination
 {
    content,
    meta,
    previous,
    next
 }
 - We need to add content when we construct by of() method
 */
export class Pageable {
    content;

    meta;

    pagination;

    /**
     * @notes Provide builder instance with specific content and query data
     * @param {any} content
     * @param {any} pagination
     * @returns {Pageable}
     */
    static of(content, pagination) {
        return new Pageable(content, pagination);
    }

    /**
     *
     * @param {*} content
     * @param {any} pagination
     */
    constructor(content, pagination) {
        this.content = content;
        this.pagination = pagination;
    }

    /**
     *
     * @param {{totalPage: number, currentPage, totalRecord, currentSize}} meta
     * @returns {Pageable}
     */
    addMeta(meta) {
        this.meta = meta;
        return this;
    }

    /**
     * @notes We finalize builder by build method
     * @returns {{meta, content}}
     */
    build() {
        if (!this.meta) {
            this.meta = {
                totalRecord: parseInt(this.content[1].count, 10),
                currentPage: this.pagination.page,
                currentSize: this.pagination.size,
            };
        }
        return {
            content: this.content[0],
            meta: this.meta,
        };
    }
}
