import { Config } from 'drizzle-kit';
export default {
  schema: './lib/db/schema.ts',
  out: './lib/db',
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgres://postgres:414335@localhost:5432/postgres',
  },
  verbose: true,
  strict: true,
} satisfies Config;
