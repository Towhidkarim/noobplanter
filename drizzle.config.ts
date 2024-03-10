import { Config } from 'drizzle-kit';
export default {
  schema: './lib/db/schema.ts',
  out: './lib/db',
  driver: 'pg',
  dbCredentials: {
    connectionString:
      'postgresql://towhidkarim123:ukbX1ZY2deTj@ep-soft-dream-a13oewxm.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  },
  verbose: true,
  strict: true,
} satisfies Config;
