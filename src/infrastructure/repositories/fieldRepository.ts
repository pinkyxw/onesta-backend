import { fields } from '../database/schema';
import { db } from '../database/connection';
import { eq } from 'drizzle-orm';
import { defaultCRUD } from './utils';


export const fieldRepository = {
  ...defaultCRUD(fields),

  getAllByFarmerId: async (farmerId: number) => {
    return await db.select().from(fields).where(eq(fields.farmerId, farmerId));
  },
};
