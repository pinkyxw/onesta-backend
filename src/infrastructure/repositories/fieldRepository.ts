import { fields } from '../database/schema';
import { db } from '../database/connection';
import { eq, and, sql } from 'drizzle-orm';
import { defaultCRUD } from '../../shared/defaultRepositoryMethods';


export const fieldRepository = {
  ...defaultCRUD(fields),

  getAllByFarmerId: async (farmerId: number) => {
    return await db.select().from(fields).where(eq(fields.farmerId, farmerId));
  },

  findByNameAndLocation: async (name: string, location: string) => {
    return await db.select().from(fields).where(and(eq(fields.name, name), eq(fields.location, location)));
  },
};
