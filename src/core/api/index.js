import { MediaResolver } from 'core/api/media';
import { UserResolver } from 'core/api/user/user.resolver';
import { ApiDocument } from 'core/config/swagger.config';
import { HandlerResolver } from '../../packages/handler/HandlerResolver';
import { AuthResolver } from './auth/auth.resolver';
import { RecipeResolver } from './recipes';
import { IngredientResolver } from './ingredients';

export const ModuleResolver = HandlerResolver.builder()
    .addSwaggerBuilder(ApiDocument)
    .addModule([AuthResolver, UserResolver, MediaResolver, RecipeResolver, IngredientResolver]);
