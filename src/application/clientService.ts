import { clientRepository } from '../infrastructure/repositories/clientRepository';
import { harvestRepository } from '../infrastructure/repositories/harvestRepository';

import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});


export const clientService = {

  get: async (id: number) => {
    const client = await clientRepository.get(id);
    if (!client.length) {
      return null;
    }

    const harvests = await harvestRepository.getAllByClientId(id);
    return { ...client[0], harvests };
  },

  getAll: async () => {
    return await clientRepository.getAll();
  },
  
  create: async (name: string, email: string) => {
    const validatedData = clientSchema.parse({ name, email });
    return await clientRepository.create({ name: validatedData.name, email: validatedData.email });
  },


};
