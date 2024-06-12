import dotenv from 'dotenv';

import { defineConfig } from 'drizzle-kit';

dotenv.config({
  path: './.env',
});

export default defineConfig({
  schema: './src/schemas.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
