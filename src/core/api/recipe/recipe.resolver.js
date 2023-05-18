import { Module } from 'packages/handler/Module';
import { RecordId, DefaultQueryCriteriaDocument } from 'core/common/swagger';
import { GetRecipesByIngredientsInterceptor } from 'core/modules/recipe/interceptor/get-recipes-by-ingredients.interceptor';
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
            preAuthorization: false,
        },
        {
            route: '/:id',
            method: 'get',
            params: [RecordId],
            controller: RecipeController.findById,
            preAuthorization: false,
        },
        {
            route: '/ingredients',
            method: 'get',
            interceptors: [GetRecipesByIngredientsInterceptor],
            body: 'GetRecipesByIngredientsDto',
            controller: RecipeController.findByIngredientIds,
            preAuthorization: false,
        },
    ]);
