import express from 'express';
import { updateAvatar } from '../controllers/usersControllers.js';
import { auth } from '../middlewares/authMiddleware.js';

import { uploadImage } from '../middlewares/imgMiddleware.js';

const usersRouter = express.Router();

usersRouter.patch('/avatar', auth, uploadImage, updateAvatar);

export default usersRouter;
