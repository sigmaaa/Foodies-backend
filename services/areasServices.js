import { Area } from '../db/models/areasModel.js';

export const getAllAreas = async () => {
    const areas = await Area.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
    });

    return areas;
};
