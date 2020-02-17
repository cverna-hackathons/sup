import * as path from 'path';
import * as dotenv from 'dotenv';

export function loadConfig() {
  const env = process.env.ENVIRONMENT || '';
  const envPath = path.resolve(__dirname, `../config/${env}.env`);
  dotenv.config({ path: envPath });
}
