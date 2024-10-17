import { fruits } from '../database/schema';
import { defaultCRUD } from '../../shared/defaultRepositoryMethods';
import { db } from '../database/connection';
import { eq } from 'drizzle-orm';

export const fruitRepository = {
  ...defaultCRUD(fruits),

  getByName: async (name: string) => {
    return await db.select().from(fruits).where(eq(fruits.name, name));
  },
};
