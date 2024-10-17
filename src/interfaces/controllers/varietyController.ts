import { Request, Response } from 'express';
import { varietyService } from '../../application/varietyService';
import { defaultErrorHandler } from '../../shared/defaultControllerMethods';

export const varietyController = {
    
  createVariety: async (req: Request, res: Response) => {
    try {
      const { name, fruitId } = req.body;
      const variety = await varietyService.create(name, fruitId);
      res.status(201).json(variety);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getAllVarieties: async (req: Request, res: Response) => {
    try {
      const varieties = await varietyService.getAll();
      res.status(201).json(varieties);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getVariety: async (req: Request, res: Response) => {
    try {
      const variety = await varietyService.get(Number(req.params.id));
      if (!variety) {
        res.status(404).json({ error: 'Variety not found' });
        return;
      }
      res.status(201).json(variety);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

};

