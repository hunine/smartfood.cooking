import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const GetRecipesByIngredientsInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        ids: JoiUtils.uuids()
    })
);
