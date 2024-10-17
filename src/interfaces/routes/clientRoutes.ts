import express from 'express';
import { clientController } from '../controllers/clientController';

const router = express.Router();

router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClient);
router.post('/', clientController.createClient);

export default router;

