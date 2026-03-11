import { sequelize } from './sequelize.js';
import './associations.js';

export async function connectDatabase() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        throw error;
    }
}
