import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('GetRecipesByIngredientsDto',
    {
        ids: SwaggerDocument.ApiProperty({ type: 'array', model: 'string' })
    });

export const GetRecipesByIngredientsDto = body => ({
    ids: body.ids
});
