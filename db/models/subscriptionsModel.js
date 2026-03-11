import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Subscription = sequelize.define(
    'Subscription',
    {
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        following_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'subscriptions',
        hooks: {
            beforeCreate(subscription) {
                if (subscription.follower_id === subscription.following_id) {
                    throw new Error('User cannot subscribe to himself');
                }
            },

            beforeUpdate(subscription) {
                if (subscription.follower_id === subscription.following_id) {
                    throw new Error('User cannot subscribe to himself');
                }
            },
        },
    },
);
