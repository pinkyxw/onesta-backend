import { varietyRepository } from '../infrastructure/repositories/varietyRepository';
import { z } from 'zod';


const varietySchema = z.object({
  name: z.string().min(1),
  fruitId: z.number(),
});

export const varietyService = {

  get: async (id: number) => {
    const variety = await varietyRepository.get(id);
    if (!variety.length) {
      return null;
    }
    return variety[0];
  },

  getAll: async () => {
    return await varietyRepository.getAll();
  },
  
  create: async (name: string, fruitId: number) => {
    const validatedData = varietySchema.parse({ name, fruitId });
    return await varietyRepository.create({ name: validatedData.name, fruitId: validatedData.fruitId });
  },


};
