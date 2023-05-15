import { Module } from 'packages/handler/Module';
import { DefaultQueryCriteriaDocument } from 'core/common/swagger';
import { CategoryController } from './category.controller';

export const CategoryResolver = Module.builder()
    .addPrefix({
        prefixPath: '/categories',
        tag: 'categories',
        module: 'CategoryModule',
    })
    .register([
        {
            route: '/',
            method: 'get',
            params: DefaultQueryCriteriaDocument,
            controller: CategoryController.findAll,
        },
    ]);
