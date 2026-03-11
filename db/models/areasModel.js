import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Area = sequelize.define(
    'Area',
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
    { tableName: 'areas' },
);
