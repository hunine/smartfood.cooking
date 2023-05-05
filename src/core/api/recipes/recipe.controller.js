import { RecipeService } from 'core/modules/recipes/services/recipes.service';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { RequestTransformer } from 'packages/restBuilder/core/requestTransformer';
import searchRecipeSchema from './query/searchRecipe.schema.json';

class Controller {
    constructor() {
        this.service = RecipeService;
    }

    findAll = async req => {
        const reqTransformed = new RequestTransformer(
            req.query,
            searchRecipeSchema,
        );
        const data = await this.service.getAndCount(reqTransformed);

        return ValidHttpResponse.toOkResponse(data);
    };

    findById = async req => {
        const data = await this.service.findById(req.params.id);
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const RecipeController = new Controller();
