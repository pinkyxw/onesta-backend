import { Request, Response } from 'express';
import { fruitService } from '../../application/fruitService';
import { defaultErrorHandler } from './utils';

export const fruitController = {
    
  createFruit: async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const fruit = await fruitService.create(name);
      res.status(201).json(fruit);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getAllFruits: async (req: Request, res: Response) => {
    try {
      const fruits = await fruitService.getAll();
      res.status(201).json(fruits);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getFruit: async (req: Request, res: Response) => {
    try {
      const fruit = await fruitService.get(Number(req.params.id));
      if (!fruit) {
        res.status(404).json({ error: 'Fruit not found' });
        return;
      }
      res.status(201).json(fruit);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

};

