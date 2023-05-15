import { Module } from 'packages/handler/Module';
import { DefaultQueryCriteriaDocument } from 'core/common/swagger';
import { LevelController } from './level.controller';

export const LevelResolver = Module.builder()
    .addPrefix({
        prefixPath: '/levels',
        tag: 'levels',
        module: 'LevelModule',
    })
    .register([
        {
            route: '/',
            method: 'get',
            params: DefaultQueryCriteriaDocument,
            controller: LevelController.findAll,
        },
    ]);
