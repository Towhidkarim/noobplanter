import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client, Pool } from 'pg';
import * as schema from '././schema';

// const migrationClient = postgres(process.env.DB_URI!, { max: 1 });
const client = new Pool({ connectionString: process.env.DB_URI!, max: 2 });
// migrate(drizzle(client), {
//   migrationsFolder: '/lib/db/migrations',
//   migrationsSchema: './schema.ts',
// });
async function dbconnect() {
  await client.connect();
}
dbconnect();

// export const db = drizzle(client, { schema });
// export default db;
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: NodePgDatabase<typeof schema> | undefined;
}

let db: NodePgDatabase<typeof schema>;

if (process.env.NODE_ENV === 'production') {
  db = drizzle(client, { schema });
} else {
  if (!global.db) global.db = drizzle(client, { schema });

  db = global.db;
}

export default db;
