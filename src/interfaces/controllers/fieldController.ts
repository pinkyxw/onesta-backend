import { Request, Response } from 'express';
import { fieldService } from '../../application/fieldService';
import { defaultErrorHandler } from '../../shared/defaultControllerMethods';

export const fieldController = {
    
  createField: async (req: Request, res: Response) => {
    try {
      const { name, location, farmerId } = req.body;
      const field = await fieldService.create(name, location, farmerId);
      res.status(201).json(field);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getAllFields: async (req: Request, res: Response) => {
    try {
      const fields = await fieldService.getAll();
      res.status(201).json(fields);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getField: async (req: Request, res: Response) => {
    try {
      const field = await fieldService.get(Number(req.params.id));
      if (!field) {
        res.status(404).json({ error: 'Field not found' });
        return;
      }
      res.status(201).json(field);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

};

