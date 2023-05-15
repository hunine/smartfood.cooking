import Joi from 'joi';
import { DefaultValidatorInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';

export const RecordIdArrayInterceptor = DefaultValidatorInterceptor(
    Joi.object({
        ids: Joi.array()
            .items(
                JoiUtils.uuid().message(
                    'Array contain unexpected id format! It should be uuid format',
                ),
            )
            .min(1)
            .required(),
    }),
);
