import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Recipe = sequelize.define(
    'Recipe',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 150],
            },
        },

        description: {
            type: DataTypes.TEXT,
        },

        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },

        thumb: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },

        preview: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },

        time: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
            },
        },

        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        area_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    { tableName: 'recipes' },
);
