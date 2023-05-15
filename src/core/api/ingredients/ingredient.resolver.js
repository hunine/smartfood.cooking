import { Module } from 'packages/handler/Module';
import { DefaultQueryCriteriaDocument } from 'core/common/swagger';
import { IngredientController } from './ingredient.controller';

export const IngredientResolver = Module.builder()
    .addPrefix({
        prefixPath: '/ingredients',
        tag: 'ingredients',
        module: 'IngredientModule',
    })
    .register([
        {
            route: '/',
            method: 'get',
            params: DefaultQueryCriteriaDocument,
            controller: IngredientController.findAll,
        },
    ]);
