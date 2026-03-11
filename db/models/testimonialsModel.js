import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Testimonial = sequelize.define(
    'Testimonial',
    {
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        testimonial: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { tableName: 'testimonials' },
);
