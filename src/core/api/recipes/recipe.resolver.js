import { Module } from 'packages/handler/Module';
import { RecordId } from 'core/common/swagger';
import { RecipeController } from './recipe.controller';

export const RecipeResolver = Module.builder()
    .addPrefix({
        prefixPath: '/recipes',
        tag: 'recipes',
        module: 'RecipeModule',
    })
    .register([
        {
            route: '/:id',
            controller: RecipeController.findById,
            method: 'get',
            params: [RecordId],
        },
    ]);
