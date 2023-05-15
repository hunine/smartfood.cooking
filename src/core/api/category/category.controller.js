import { CategoryService } from 'core/modules/category/services/category.service';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { RequestTransformer } from 'packages/restBuilder/core/requestTransformer';
import searchCategorySchema from './query/searchCategory.schema.json';

class Controller {
    constructor() {
        this.service = CategoryService;
    }

    findAll = async req => {
        const reqTransformed = new RequestTransformer(
            req.query,
            searchCategorySchema,
        );
        const data = await this.service.getAndCount(reqTransformed);

        return ValidHttpResponse.toOkResponse(data);
    };
}

export const CategoryController = new Controller();
