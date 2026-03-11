import { sequelize } from './sequelize.js';

import { Contact } from './models/contactsModel.js';
import { User } from './models/usersModel.js';

export async function connectDatabase() {
    try {
        await sequelize.authenticate();
        //await sequelize.sync({ force: true });
        //await sequelize.sync({ alter: true });
    } catch (error) {
        throw error;
    }
}

Contact.belongsTo(User, { foreignKey: 'owner' });
User.hasMany(Contact, { foreignKey: 'owner' });
