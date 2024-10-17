import { varieties } from '../database/schema';
import { defaultCRUD } from './utils';
import { db } from '../database/connection';
import { eq } from 'drizzle-orm';

export const varietyRepository = {
  ...defaultCRUD(varieties),

  getAllByFruitId: async (fruitId: number) => {
    return await db.select().from(varieties).where(eq(varieties.fruitId, fruitId));
  },
  
  getByName: async (name: number) => {
    return await db.select().from(varieties).where(eq(varieties.name, name));
  },
};
