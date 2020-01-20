import 'reflect-metadata';
import {
  Connection,
  createConnection,
} from 'typeorm';

export async function connect(): Promise<Connection> {
  const connection: Connection = await createConnection();

  return connection;
}
