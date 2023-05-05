import { logger } from '../../../logger';
import { BadRequestException } from '../../../httpException/BadRequestException';

export class PaginationFactory {
    static logger = logger;

    static DEFAULT_RADIX = 10;

    static MAX_PAGE = 1000;

    static MAX_SIZE = 50;

    static DEFAULT_PAGE = 1;

    static DEFAULT_SIZE = 50;

    constructor() {
        logger.info(`[${PaginationFactory.name}] is building`);
    }

    produce({ page, size }) {
        let parsedPage = Number.parseInt(page, PaginationFactory.DEFAULT_RADIX);
        let parsedSize = Number.parseInt(size, PaginationFactory.DEFAULT_RADIX);

        if (Number.isNaN(parsedPage)) {
            parsedPage = PaginationFactory.DEFAULT_PAGE;
        } else if (parsedPage > PaginationFactory.MAX_PAGE) {
            throw new BadRequestException('Page reach max');
        }

        if (Number.isNaN(parsedSize)) {
            parsedSize = PaginationFactory.DEFAULT_SIZE;
        } else if (parsedSize > PaginationFactory.MAX_SIZE) {
            throw new BadRequestException('Size reach max');
        }

        return {
            page: parsedPage,
            size: parsedSize,
            offset: (parsedPage - 1) * parsedSize
        };
    }

    static receive(obj) {
        PaginationFactory.MAX_PAGE = obj.MAX_PAGE;
        PaginationFactory.MAX_SIZE = obj.MAX_SIZE;
        PaginationFactory.DEFAULT_PAGE = obj.DEFAULT_PAGE;
        PaginationFactory.DEFAULT_SIZE = obj.DEFAULT_SIZE;
    }
}
