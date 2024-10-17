import { Request, Response } from 'express';
import { harvestService } from '../../application/harvestService';
import { defaultErrorHandler } from './utils';

export const harvestController = {

  createHarvest: async (req: Request, res: Response) => {
    try {
      const { date, amount, varietyId, fieldId, clientId } = req.body;
      const harvest = await harvestService.create(date, amount, varietyId, fieldId, clientId);
      res.status(201).json(harvest);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getAllHarvests: async (req: Request, res: Response) => {
    try {
      const harvests = await harvestService.getAll();
      res.status(201).json(harvests);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getHarvest: async (req: Request, res: Response) => {
    try {
      const harvest = await harvestService.get(Number(req.params.id));
      if (!harvest) {
        res.status(404).json({ error: 'Harvest not found' });
        return;
      }
      res.status(201).json(harvest);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

};

