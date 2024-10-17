import { db } from '../database/connection';
import { farmers } from '../database/schema';
import { eq } from 'drizzle-orm';

export const farmerRepository = {

  create: async (name: string, email: string) => {
    return await db.insert(farmers).values({ name, email }).returning();
  },

  findByEmail: async (email: string) => {
    return await db.select().from(farmers).where(eq(farmers.email, email));
  },

};
