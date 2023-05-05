import { Module } from 'packages/handler/Module';
import { RecordId, DefaultQueryCriteriaDocument } from 'core/common/swagger';
import { RecipeController } from './recipe.controller';

export const RecipeResolver = Module.builder()
    .addPrefix({
        prefixPath: '/recipes',
        tag: 'recipes',
        module: 'RecipeModule',
    })
    .register([
        {
            route: '/',
            method: 'get',
            params: DefaultQueryCriteriaDocument,
            controller: RecipeController.findAll,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            controller: RecipeController.findById,
        },
    ]);
