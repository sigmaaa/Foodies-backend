import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../sequelize.js';

export const User = sequelize.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50],
            },
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },

        token: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        tableName: 'users',
        hooks: {
            async beforeCreate(user) {
                if (user.password) {
                    const saltRounds = Number(process.env.BCRYPT_SALT || 10);
                    user.password = await bcrypt.hash(user.password, saltRounds);
                }
            },

            async beforeUpdate(user) {
                if (user.changed('password')) {
                    const saltRounds = Number(process.env.BCRYPT_SALT || 10);
                    user.password = await bcrypt.hash(user.password, saltRounds);
                }
            },
        },
    },
);

User.prototype.checkPassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
