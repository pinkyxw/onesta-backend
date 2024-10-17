import { db } from '../database/connection';
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

    }
}
