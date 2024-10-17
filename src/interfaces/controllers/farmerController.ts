import { Request, Response } from 'express';
import { farmerService } from '../../application/farmerService';

export const farmerController = {
    
  createFarmer: async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const farmer = await farmerService.createFarmer(name, email);
      res.status(201).json(farmer);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  },

};

