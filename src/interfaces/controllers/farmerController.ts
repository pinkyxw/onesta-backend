import { Request, Response } from 'express';
import { farmerService } from '../../application/farmerService';
import { defaultErrorHandler } from '../../shared/defaultControllerMethods';

export const farmerController = {
    
  createFarmer: async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const farmer = await farmerService.create(name, email);
      res.status(201).json(farmer);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getAllFarmers: async (req: Request, res: Response) => {
    try {
      const farmers = await farmerService.getAll();
      res.status(201).json(farmers);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getFarmer: async (req: Request, res: Response) => {
    try {
      const farmer = await farmerService.get(Number(req.params.id));
      if (!farmer) {
        res.status(404).json({ error: 'Farmer not found' });
        return;
      }
      res.status(201).json(farmer);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

};

