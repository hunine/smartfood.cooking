import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';

export const RecordIdInterceptor = new DefaultValidatorInterceptor(
    Joi.object({
        id: JoiUtils.uuid().message(
            'Url params contain unexpected id format! It should be uuid format',
        ),
    }),
);
