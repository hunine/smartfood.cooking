import { MediaResolver } from 'core/api/media';
import { UserResolver } from 'core/api/user/user.resolver';
import { ApiDocument } from 'core/config/swagger.config';
import { HandlerResolver } from '../../packages/handler/HandlerResolver';
import { AuthResolver } from './auth/auth.resolver';
import { RecipeResolver } from './recipe';
import { IngredientResolver } from './ingredient';
import { LevelResolver } from './level';
import { CuisineResolver } from './cuisine';
import { CategoryResolver } from './category';

export const ModuleResolver = HandlerResolver.builder()
    .addSwaggerBuilder(ApiDocument)
    .addModule([
        AuthResolver,
        UserResolver,
        MediaResolver,
        RecipeResolver,
        IngredientResolver,
        LevelResolver,
        CuisineResolver,
        CategoryResolver,
    ]);
