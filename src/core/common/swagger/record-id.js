import { SwaggerDocument } from '../../../packages/swagger';

export const RecordId = SwaggerDocument.ApiParams({
    name: 'id',
    paramsIn: 'path',
    type: 'string',
    description: 'Record Id to find',
});
