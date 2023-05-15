import { LevelService } from 'core/modules/level/services/level.service';
import { ValidHttpResponse } from 'packages/handler/response/validHttp.response';
import { RequestTransformer } from 'packages/restBuilder/core/requestTransformer';
import searchLevelSchema from './query/searchLevel.schema.json';

class Controller {
    constructor() {
        this.service = LevelService;
    }

    findAll = async req => {
        const reqTransformed = new RequestTransformer(
            req.query,
            searchLevelSchema,
        );
        const data = await this.service.getAndCount(reqTransformed);

        return ValidHttpResponse.toOkResponse(data);
    };
}

export const LevelController = new Controller();
