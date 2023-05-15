import { IngredientService } from 'core/modules/ingredient/services/ingredient.service';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { RequestTransformer } from 'packages/restBuilder/core/requestTransformer';
import searchIngredientSchema from './query/searchIngredient.schema.json';

class Controller {
    constructor() {
        this.service = IngredientService;
    }

    findAll = async req => {
        const reqTransformed = new RequestTransformer(
            req.query,
            searchIngredientSchema,
        );
        const data = await this.service.getAndCount(reqTransformed);

        return ValidHttpResponse.toOkResponse(data);
    };
}

export const IngredientController = new Controller();
