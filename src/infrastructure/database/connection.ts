// import { drizzle } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/op-sqlite';

import { Database } from 'sqlite3';
import * as schema from './schema';

const sqlite = new Database('fruit_farm.db');
export const db = drizzle(sqlite, { schema });
