import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Додай цей рядок, щоб конфіг гарантовано бачив .env
dotenv.config({ path: '../../.env' }); 

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Тут береться змінна
  },
});