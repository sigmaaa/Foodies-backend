import { User } from './models/usersModel.js';
import { Recipe } from './models/recipesModel.js';
import { Category } from './models/categoriesModel.js';
import { Area } from './models/areasModel.js';
import { Ingredient } from './models/ingredientsModel.js';
import { RecipeIngredient } from './models/recipeIngredientsModel.js';
import { Favorite } from './models/favoritesModel.js';
import { Subscription } from './models/subscriptionsModel.js';
import { Testimonial } from './models/testimonialsModel.js';

// User -> Recipe
User.hasMany(Recipe, {
    foreignKey: 'owner_id',
    as: 'recipes',
    onDelete: 'CASCADE',
});
Recipe.belongsTo(User, {
    foreignKey: 'owner_id',
    as: 'owner',
});

// Category -> Recipe
Category.hasMany(Recipe, {
    foreignKey: 'category_id',
    as: 'recipes',
});
Recipe.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
});

// Area -> Recipe
Area.hasMany(Recipe, {
    foreignKey: 'area_id',
    as: 'recipes',
});
Recipe.belongsTo(Area, {
    foreignKey: 'area_id',
    as: 'area',
});

// Recipe <-> Ingredient
Recipe.belongsToMany(Ingredient, {
    through: RecipeIngredient,
    foreignKey: 'recipe_id',
    otherKey: 'ingredient_id',
    as: 'ingredients',
});
Ingredient.belongsToMany(Recipe, {
    through: RecipeIngredient,
    foreignKey: 'ingredient_id',
    otherKey: 'recipe_id',
    as: 'recipes',
});

Recipe.hasMany(RecipeIngredient, {
    foreignKey: 'recipe_id',
    as: 'recipeIngredients',
    onDelete: 'CASCADE',
});
RecipeIngredient.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    as: 'recipe',
});

Ingredient.hasMany(RecipeIngredient, {
    foreignKey: 'ingredient_id',
    as: 'ingredientRecipes',
});
RecipeIngredient.belongsTo(Ingredient, {
    foreignKey: 'ingredient_id',
    as: 'ingredient',
});

// User <-> Favorite <-> Recipe
User.belongsToMany(Recipe, {
    through: Favorite,
    foreignKey: 'user_id',
    otherKey: 'recipe_id',
    as: 'favoriteRecipes',
});
Recipe.belongsToMany(User, {
    through: Favorite,
    foreignKey: 'recipe_id',
    otherKey: 'user_id',
    as: 'usersWhoFavorited',
});

User.hasMany(Favorite, {
    foreignKey: 'user_id',
    as: 'favorites',
    onDelete: 'CASCADE',
});
Favorite.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

Recipe.hasMany(Favorite, {
    foreignKey: 'recipe_id',
    as: 'favorites',
    onDelete: 'CASCADE',
});
Favorite.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    as: 'recipe',
});

// User <-> User subscriptions
User.belongsToMany(User, {
    through: Subscription,
    as: 'followers',
    foreignKey: 'following_id',
    otherKey: 'follower_id',
});

User.belongsToMany(User, {
    through: Subscription,
    as: 'followings',
    foreignKey: 'follower_id',
    otherKey: 'following_id',
});

User.hasMany(Subscription, {
    foreignKey: 'follower_id',
    as: 'subscriptions',
    onDelete: 'CASCADE',
});

User.hasMany(Subscription, {
    foreignKey: 'following_id',
    as: 'subscribers',
    onDelete: 'CASCADE',
});

Subscription.belongsTo(User, {
    foreignKey: 'follower_id',
    as: 'follower',
});

Subscription.belongsTo(User, {
    foreignKey: 'following_id',
    as: 'following',
});

// User -> Testimonial
User.hasMany(Testimonial, {
    foreignKey: 'owner_id',
    as: 'testimonials',
    onDelete: 'CASCADE',
});

Testimonial.belongsTo(User, {
    foreignKey: 'owner_id',
    as: 'owner',
});
