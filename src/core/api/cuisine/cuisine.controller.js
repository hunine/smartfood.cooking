import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { RequestTransformer } from 'packages/restBuilder/core/requestTransformer';
import { CuisineService } from 'core/modules/cuisine/services/cuisine.service';
import searchCuisineSchema from './query/searchCuisine.schema.json';

class Controller {
    constructor() {
        this.service = CuisineService;
    }

    findAll = async req => {
        const reqTransformed = new RequestTransformer(
            req.query,
            searchCuisineSchema,
        );
        const data = await this.service.getAndCount(reqTransformed);

        return ValidHttpResponse.toOkResponse(data);
    };
}

export const CuisineController = new Controller();
