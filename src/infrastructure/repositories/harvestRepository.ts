import { harvests } from '../database/schema';
import { defaultCRUD } from '../../shared/defaultRepositoryMethods';
import { db } from '../database/connection';
import { eq } from 'drizzle-orm';

export const harvestRepository = {
  ...defaultCRUD(harvests),

  getAllByVarieryId: async (varietyId: number) => {
    return await db.select().from(harvests).where(eq(harvests.varietyId, varietyId));
  },

  getAllByFieldId: async (fieldId: number) => {
    return await db.select().from(harvests).where(eq(harvests.fieldId, fieldId));
  },

  getAllByClientId: async (clientId: number) => {
    return await db.select().from(harvests).where(eq(harvests.clientId, clientId));
  },
};
