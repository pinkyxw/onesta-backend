import { fieldRepository } from '../infrastructure/repositories/fieldRepository';
import { z } from 'zod';


const fieldSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  farmerId: z.number(),
});

export const fieldService = {

  get: async (id: number) => {
    const field = await fieldRepository.get(id);
    if (!field.length) {
      return null;
    }
    return field[0];
  },

  getAll: async () => {
    return await fieldRepository.getAll();
  },
  
  create: async (name: string, location: string, farmerId: number) => {
    const validatedData = fieldSchema.parse({ name, location, farmerId });
    return await fieldRepository.create({ name: validatedData.name, location: validatedData.location, farmerId: validatedData.farmerId });
  },


};
