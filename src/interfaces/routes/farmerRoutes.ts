import express from 'express';
import { farmerController } from '../controllers/farmerController';

const router = express.Router();

router.get('/', (req, res) => { res.send('Hello farmer'); });
router.post('/', farmerController.createFarmer);

export default router;

