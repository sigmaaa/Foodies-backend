import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Ingredient = sequelize.define(
    'Ingredient',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },

        img: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    },
    { tableName: 'ingredients' },
);
