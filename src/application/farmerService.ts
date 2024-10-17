import { farmerRepository } from '../infrastructure/repositories/farmerRepository';
import { z } from 'zod';

const farmerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const farmerService = {

  createFarmer: async (name: string, email: string) => {
    const validatedData = farmerSchema.parse({ name, email });
    const existingFarmer = await farmerRepository.findByEmail(validatedData.email);
    if (existingFarmer.length > 0) {
      throw new Error('Farmer with this email already exists'); // 400
    }
    return await farmerRepository.create(validatedData.name, validatedData.email);
  },

};
