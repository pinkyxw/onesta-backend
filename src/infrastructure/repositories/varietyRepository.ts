import { varieties } from '../database/schema';
import { defaultCRUD } from '../../shared/defaultRepositoryMethods';
import { db } from '../database/connection';
import { eq } from 'drizzle-orm';

export const varietyRepository = {
  ...defaultCRUD(varieties),

  getAllByFruitId: async (fruitId: number) => {
    return await db.select().from(varieties).where(eq(varieties.fruitId, fruitId));
  },
  
  getByName: async (name: string) => {
    return await db.select().from(varieties).where(eq(varieties.name, name));
  },
};
