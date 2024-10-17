import { fruitRepository } from '../infrastructure/repositories/fruitRepository';
import { varietyRepository } from '../infrastructure/repositories/varietyRepository';

import { z } from 'zod';

const fruitSchema = z.object({
  name: z.string().min(1),
});


export const fruitService = {

  get: async (id: number) => {
    const fruit = await fruitRepository.get(id);
    if (!fruit.length) {
      return null;
    }

    const varieties = await varietyRepository.getAllByFruitId(id);
    return { ...fruit[0], varieties };
  },

  getAll: async () => {
    return await fruitRepository.getAll();
  },
  
  create: async (name: string) => {
    const validatedData = fruitSchema.parse({ name });
    return await fruitRepository.create({ name: validatedData.name });
  },


};
