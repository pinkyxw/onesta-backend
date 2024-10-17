import { Request, Response } from 'express';
import { clientService } from '../../application/clientService';
import { defaultErrorHandler } from '../../shared/defaultControllerMethods';

export const clientController = {
    
  createClient: async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const client = await clientService.create(name, email);
      res.status(201).json(client);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getAllClients: async (req: Request, res: Response) => {
    try {
      const clients = await clientService.getAll();
      res.status(201).json(clients);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

  getClient: async (req: Request, res: Response) => {
    try {
      const client = await clientService.get(Number(req.params.id));
      if (!client) {
        res.status(404).json({ error: 'Client not found' });
        return;
      }
      res.status(201).json(client);
    } catch (error) {
      defaultErrorHandler(error, res);
    }
  },

};

