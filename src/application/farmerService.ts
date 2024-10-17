import { farmerRepository } from '../infrastructure/repositories/farmerRepository';
import { z } from 'zod';
import { fieldRepository } from '../infrastructure/repositories/fieldRepository';

const farmerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const farmerService = {

  get: async (id: number) => {
    const farmer = await farmerRepository.get(id);
    if (!farmer.length) {
      return null;
    }

    const fields = await fieldRepository.getAllByFarmerId(id);
    return { ...farmer[0], fields };
  },

  getAll: async () => {
    return await farmerRepository.getAll();
  },
  
  create: async (name: string, email: string) => {
    const validatedData = farmerSchema.parse({ name, email });
    // const existingFarmer = await farmerRepository.findByEmail(validatedData.email);
    // if (existingFarmer.length > 0) {
    //   throw new Error('Farmer with this email already exists'); // 400
    // }

    return await farmerRepository.create({ name: validatedData.name, email: validatedData.email });
  },


};
