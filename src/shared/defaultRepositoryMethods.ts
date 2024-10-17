import { db } from '../infrastructure/database/connection';
import { eq } from 'drizzle-orm';

const LIMIT = 1000;

export function defaultCRUD(schema: any) {
    return  {
        get: async (id: number) => {
            return await db.select().from(schema).where(eq(schema.id, id));
        },
        
        getAll: async () => {
            return await db.select().from(schema).limit(LIMIT);
        },
        
        create: async (data: any) => {
            return await db.insert(schema).values({ ...data }).returning();
        },

        update: async (id: number, data: any) => {
            return await db.update(schema).set({ ...data }).where(eq(schema.id, id)).returning();
        },

        delete: async (id: number) => {
            return await db.delete(schema).where(eq(schema.id, id));
        },

    }
}
