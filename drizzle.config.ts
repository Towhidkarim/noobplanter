import { Config } from 'drizzle-kit';
export default {
  schema: './lib/db/schema.ts',
  out: './lib/db',
  driver: 'pg',
  dbCredentials: {
    connectionString:
      '',
  },
  verbose: true,
  strict: true,
} satisfies Config;
