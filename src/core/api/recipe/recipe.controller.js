import { RecipeService } from 'core/modules/recipe/services/recipe.service';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { RequestTransformer } from 'packages/restBuilder/core/requestTransformer';
import { GetRecipesByIngredientsDto } from 'core/modules/recipe/dto/get-recipes-by-ingredients';
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

    findByIngredientIds = async req => {
        const data = await this.service.findByIngredientIds(GetRecipesByIngredientsDto(req.body).ids);
        return ValidHttpResponse.toOkResponse(data);
    };
}

export const RecipeController = new Controller();
