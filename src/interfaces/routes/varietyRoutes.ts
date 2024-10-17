import express from 'express';
import { varietyController } from '../controllers/varietyController';

const router = express.Router();

router.get('/', varietyController.getAllVarieties);
router.get('/:id', varietyController.getVariety);
router.post('/', varietyController.createVariety);

export default router;

