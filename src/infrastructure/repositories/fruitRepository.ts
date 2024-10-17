import { fruits } from '../database/schema';
import { defaultCRUD } from './utils';
import { db } from '../database/connection';
import { eq } from 'drizzle-orm';

export const fruitRepository = {
  ...defaultCRUD(fruits),

  getByName: async (name: number) => {
    return await db.select().from(fruits).where(eq(fruits.name, name));
  },
};
