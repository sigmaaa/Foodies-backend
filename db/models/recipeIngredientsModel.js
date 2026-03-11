import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const RecipeIngredient = sequelize.define(
    'RecipeIngredient',
    {
        recipe_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        ingredient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        measure: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        tableName: 'recipe_ingredients',
        indexes: [
            {
                unique: true,
                fields: ['recipe_id', 'ingredient_id'],
            },
        ],
    },
);
