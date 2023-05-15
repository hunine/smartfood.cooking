import { Module } from 'packages/handler/Module';
import { DefaultQueryCriteriaDocument } from 'core/common/swagger';
import { CuisineController } from './cuisine.controller';

export const CuisineResolver = Module.builder()
    .addPrefix({
        prefixPath: '/cuisine',
        tag: 'cuisine',
        module: 'CuisineModule',
    })
    .register([
        {
            route: '/',
            method: 'get',
            params: DefaultQueryCriteriaDocument,
            controller: CuisineController.findAll,
        },
    ]);
