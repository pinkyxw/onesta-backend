import { harvestRepository } from '../infrastructure/repositories/harvestRepository';
import { z } from 'zod';

const harvestSchema = z.object({
  date: z.string().min(1),
  amount: z.number(),
  varietyId: z.number(),
  fieldId: z.number(),
  clientId: z.number(),
});

export const harvestService = {

  get: async (id: number) => {
    const harvest = await harvestRepository.get(id);
    if (!harvest.length) {
      return null;
    }
    return harvest[0];
  },

  getAll: async () => {
    return await harvestRepository.getAll();
  },
  
  create: async (date: string, amount: number, varietyId: number, fieldId: number, clientId: number) => {
    const validatedData = harvestSchema.parse({ date, amount, varietyId, fieldId, clientId });
    return await harvestRepository.create({ 
      date: validatedData.date,
      amount: validatedData.amount,
      varietyId: validatedData.varietyId,
      fieldId: validatedData.fieldId,
      clientId: validatedData.clientId,
    });
  },

};
