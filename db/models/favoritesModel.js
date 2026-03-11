import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Favorite = sequelize.define(
    'Favorite',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        recipe_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'favorites',
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'recipe_id'],
            },
        ],
    },
);
