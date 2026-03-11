import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Category = sequelize.define(
    'Category',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
    },
    { tableName: 'categories' },
);
