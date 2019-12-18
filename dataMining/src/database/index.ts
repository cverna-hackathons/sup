import * as dotenv from 'dotenv';
import 'reflect-metadata';
import {
  Connection,
  createConnection,
} from 'typeorm';

dotenv.config();

export async function connect(): Promise<Connection> {
  const connection: Connection = await createConnection();

  return connection;
}
