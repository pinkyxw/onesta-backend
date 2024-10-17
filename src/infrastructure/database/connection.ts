

import Database from 'better-sqlite3';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/better-sqlite3';


const sqlite = new Database('fruit_farm.db');
export const db = drizzle({ client: sqlite, schema });

