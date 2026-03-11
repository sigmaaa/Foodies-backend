import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

import { sequelize } from '../sequelize.js';

import { User } from '../models/usersModel.js';
import { Recipe } from '../models/recipesModel.js';
import { Category } from '../models/categoriesModel.js';
import { Area } from '../models/areasModel.js';
import { Ingredient } from '../models/ingredientsModel.js';
import { RecipeIngredient } from '../models/recipeIngredientsModel.js';
import { Favorite } from '../models/favoritesModel.js';
import { Subscription } from '../models/subscriptionsModel.js';
import { Testimonial } from '../models/testimonialsModel.js';

import '../associations.js';

export async function connectDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        //await sequelize.sync({ alter: true });
    } catch (error) {
        throw error;
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// change this if your csv files are in another folder
const DATA_DIR = __dirname;

function readCsv(filePath) {
    return new Promise((resolve, reject) => {
        const rows = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => rows.push(row))
            .on('end', () => resolve(rows))
            .on('error', reject);
    });
}

function normalizeNullableString(value) {
    if (value === undefined || value === null) return null;
    const trimmed = String(value).trim();
    return trimmed === '' ? null : trimmed;
}

function normalizeRequiredString(value) {
    return String(value ?? '').trim();
}

function normalizeTime(value) {
    const trimmed = String(value ?? '').trim();
    if (!trimmed) return null;

    const num = Number(trimmed);
    return Number.isNaN(num) ? null : num;
}

async function importAreas() {
    const rows = await readCsv(path.join(DATA_DIR, 'areas.csv'));
    const areaNameToNewId = new Map();

    for (const row of rows) {
        const created = await Area.create({
            name: normalizeRequiredString(row.name),
        });

        areaNameToNewId.set(normalizeRequiredString(row.name), created.id);
    }

    console.log(`Imported areas: ${rows.length}`);
    return areaNameToNewId;
}

async function importCategories() {
    const rows = await readCsv(path.join(DATA_DIR, 'categories.csv'));
    const categoryNameToNewId = new Map();

    for (const row of rows) {
        const created = await Category.create({
            name: normalizeRequiredString(row.name),
        });

        categoryNameToNewId.set(normalizeRequiredString(row.name), created.id);
    }

    console.log(`Imported categories: ${rows.length}`);
    return categoryNameToNewId;
}

async function importIngredients() {
    const rows = await readCsv(path.join(DATA_DIR, 'ingredients.csv'));
    const ingredientOldToNewId = new Map();

    for (const row of rows) {
        const created = await Ingredient.create({
            name: normalizeRequiredString(row.name),
            description: normalizeNullableString(row.description),
            img: normalizeNullableString(row.img),
        });

        ingredientOldToNewId.set(normalizeRequiredString(row.id), created.id);
    }

    console.log(`Imported ingredients: ${rows.length}`);
    return ingredientOldToNewId;
}

async function importUsers() {
    const rows = await readCsv(path.join(DATA_DIR, 'users.csv'));
    const userOldToNewId = new Map();

    for (const row of rows) {
        const created = await User.create({
            name: normalizeRequiredString(row.name),
            email: normalizeRequiredString(row.email)?.toLowerCase(),
            password: 'password',
            avatar: normalizeNullableString(row.avatar),
        });

        userOldToNewId.set(normalizeRequiredString(row.id), created.id);
    }

    console.log(`Imported users: ${rows.length}`);
    return userOldToNewId;
}

async function importRecipes(maps) {
    const rows = await readCsv(path.join(DATA_DIR, 'recipes.csv'));
    const recipeOldToNewId = new Map();

    const { categoryNameToNewId, areaNameToNewId, userOldToNewId } = maps;

    for (const row of rows) {
        const categoryId = categoryNameToNewId.get(normalizeRequiredString(row.category));
        const areaId = areaNameToNewId.get(normalizeRequiredString(row.area));
        const ownerId = userOldToNewId.get(normalizeRequiredString(row.owner_id));

        if (!categoryId) {
            throw new Error(`Category not found for recipe "${row.title}": ${row.category}`);
        }

        if (!areaId) {
            throw new Error(`Area not found for recipe "${row.title}": ${row.area}`);
        }

        if (!ownerId) {
            throw new Error(`Owner not found for recipe "${row.title}": ${row.owner_id}`);
        }

        const created = await Recipe.create({
            title: normalizeRequiredString(row.title),
            description: normalizeRequiredString(row.description),
            instructions: normalizeRequiredString(row.instructions),
            thumb: normalizeNullableString(row.thumb),
            preview: normalizeNullableString(row.preview),
            time: normalizeTime(row.time),
            owner_id: ownerId,
            category_id: categoryId,
            area_id: areaId,
        });

        recipeOldToNewId.set(normalizeRequiredString(row.id), created.id);
    }

    console.log(`Imported recipes: ${rows.length}`);
    return recipeOldToNewId;
}

async function importRecipeIngredients(maps) {
    const rows = await readCsv(path.join(DATA_DIR, 'recipe_ingredients.csv'));
    const { recipeOldToNewId, ingredientOldToNewId } = maps;

    let importedCount = 0;

    for (const row of rows) {
        const recipeId = recipeOldToNewId.get(normalizeRequiredString(row.recipe_id));
        const ingredientId = ingredientOldToNewId.get(normalizeRequiredString(row.ingredient_id));

        if (!recipeId) {
            throw new Error(`Recipe not found for recipe_ingredients row: ${row.recipe_id}`);
        }

        if (!ingredientId) {
            throw new Error(`Ingredient not found for recipe_ingredients row: ${row.ingredient_id}`);
        }

        await RecipeIngredient.create({
            recipe_id: recipeId,
            ingredient_id: ingredientId,
            measure: normalizeNullableString(row.measure),
        });

        importedCount += 1;
    }

    console.log(`Imported recipe ingredients: ${importedCount}`);
}

async function importTestimonials(maps) {
    const rows = await readCsv(path.join(DATA_DIR, 'testimonials.csv'));
    const { userOldToNewId } = maps;

    let importedCount = 0;

    for (const row of rows) {
        const ownerId = userOldToNewId.get(normalizeRequiredString(row.owner_id));

        if (!ownerId) {
            throw new Error(`Owner not found for testimonial row: ${row.owner_id}`);
        }

        await Testimonial.create({
            owner_id: ownerId,
            testimonial: normalizeRequiredString(row.testimonial),
        });

        importedCount += 1;
    }

    console.log(`Imported testimonials: ${importedCount}`);
}

async function main() {
    try {
        await connectDatabase();

        const areaNameToNewId = await importAreas();
        const categoryNameToNewId = await importCategories();
        const ingredientOldToNewId = await importIngredients();
        const userOldToNewId = await importUsers();

        const recipeOldToNewId = await importRecipes({
            categoryNameToNewId,
            areaNameToNewId,
            userOldToNewId,
        });

        await importRecipeIngredients({
            recipeOldToNewId,
            ingredientOldToNewId,
        });

        await importTestimonials({
            userOldToNewId,
        });

        console.log('Import completed successfully.');
    } catch (error) {
        console.error('Import failed:', error);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
}

main();
