import { Router } from 'express';
import { getAreasController } from '../controllers/areasController.js';

const areasRouter = Router();

areasRouter.get('/', getAreasController);

export default areasRouter;
