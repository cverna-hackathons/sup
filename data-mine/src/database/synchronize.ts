import { createConnection } from 'typeorm';
import { loadConfig } from '../../config/loadConfig';

loadConfig();

(async function() {
  const connection = await createConnection();
  await connection.synchronize();
  await connection.close();
})()
