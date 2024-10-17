import { clients } from '../database/schema';
import { defaultCRUD } from '../../shared/defaultRepositoryMethods';
import { db } from '../database/connection';
import { eq } from 'drizzle-orm';

export const clientRepository = {
  ...defaultCRUD(clients),

  getByEmail: async (email: string) => {
    return await db.select().from(clients).where(eq(clients.email, email));
  },
};
