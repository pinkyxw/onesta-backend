import { db } from '../database/connection';
import { farmers, fields } from '../database/schema';
import { eq } from 'drizzle-orm';
import { defaultCRUD } from './utils';


export const farmerRepository = {

  ...defaultCRUD(farmers),

  create: async (name: string, email: string, fields_in: any[]) => {
    return await db.transaction(
      async (tx) => {
        try {
          const farmerResult = await tx.insert(farmers).values({name, email}).returning();
          for (const field of fields_in) {
            await tx.insert(fields).values({ name: field.name, location: field.location, farmerId: farmerResult[0].id }).returning();
          }
          return { ...farmerResult[0], fields: fields_in };
        } catch (error) {
          tx.rollback(); // rollback and auto rollback are not working :(
          throw error;
        }
      }
    );
  },

  findByEmail: async (email: string) => {
    return await db.select().from(farmers).where(eq(farmers.email, email));
  },

};
