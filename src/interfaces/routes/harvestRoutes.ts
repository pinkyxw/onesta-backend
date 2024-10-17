import express from 'express';
import { harvestController } from '../controllers/harvestController';

const router = express.Router();

router.get('/', harvestController.getAllHarvests);
router.get('/:id', harvestController.getHarvest);
router.post('/', harvestController.createHarvest);

export default router;

