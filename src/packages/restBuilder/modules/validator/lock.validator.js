import { BadRequestException } from '../../../httpException/BadRequestException';

export class LockValidator {
    sorts;

    filters;

    static builder() {
        return new LockValidator();
    }

    applySortContext(sorts) {
        this.sorts = sorts;
        return this;
    }

    applyFilterContext(filters) {
        this.filters = filters;
        return this;
    }

    validate(obj) {
        if (!obj) return;

        const { filters, sorts } = obj;
        if (Array.isArray(sorts) && this.sorts.length > 0) {
            const isNotValidField = !this.sorts.some(
                item => sorts.find(sortField => sortField[item.sort] !== undefined) !== undefined
            );

            if (isNotValidField) {
                throw new BadRequestException('Invalid sort field');
            }
        }

        if (Array.isArray(filters) && this.filters.length > 0) {
            const isNotInvalidField = !this.filters.some(
                item => filters.find(filterField => filterField[item.column] !== undefined) !== undefined
            );

            if (isNotInvalidField) {
                throw new BadRequestException('Invalid filter field');
            }
        }
    }
}
