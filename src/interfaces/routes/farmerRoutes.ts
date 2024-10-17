import express from 'express';
import { farmerController } from '../controllers/farmerController';

const router = express.Router();

router.get('/', farmerController.getAllFarmers);
router.get('/:id', farmerController.getFarmer);
router.post('/', farmerController.createFarmer);

export default router;

