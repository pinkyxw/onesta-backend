import express from 'express';
import { fieldController } from '../controllers/fieldController';

const router = express.Router();

router.get('/', fieldController.getAllFields);
router.get('/:id', fieldController.getField);
router.post('/', fieldController.createField);

export default router;

