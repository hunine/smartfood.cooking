import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';

const {
    RecipeService,
} = require('core/modules/recipes/services/recipes.service');

class Controller {
    constructor() {
        this.service = RecipeService;
    }

  findById = async req => {
      const data = await this.service.findById(req.params.id);
      return ValidHttpResponse.toOkResponse(data);
  };
}

export const RecipeController = new Controller();
