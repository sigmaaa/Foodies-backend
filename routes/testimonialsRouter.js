import { Router } from 'express';
import { getTestimonialsController } from '../controllers/testimonialsController.js';

const testimonialsRouter = Router();

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: List of testimonials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   owner_id:
 *                     type: integer
 *                     example: 3
 *                   testimonial:
 *                     type: string
 *                     example: "This platform is amazing!"
 */


testimonialsRouter.get('/', getTestimonialsController);

export default testimonialsRouter;
