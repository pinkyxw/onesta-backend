import express from 'express';
import { fruitController } from '../controllers/fruitController';

const router = express.Router();

router.get('/', fruitController.getAllFruits);
router.get('/:id', fruitController.getFruit);
router.post('/', fruitController.createFruit);

export default router;

