import { getAllAreas } from '../services/areasServices.js';

export const getAreasController = async (req, res, next) => {
    try {
        const areas = await getAllAreas();
        res.status(200).json(areas);
    } catch (error) {
        next(error);
    }
};
