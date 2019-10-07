import * as dotenv from 'dotenv';
import 'reflect-metadata';
import {
  Connection,
  ConnectionOptions,
  createConnection,
} from 'typeorm';
import { User } from '../user/model';

dotenv.config();

export async function connect(): Promise<Connection> {
  const {
    DB_DIALECT = 'postgres',
    DB_HOST = 'localhost',
    DB_NAME = 'sup',
    DB_PASSWORD,
    DB_PORT = 5432,
    DB_USER = 'postgres',
  } = process.env;
  const connection: Connection = await createConnection({
    database: DB_NAME,
    entities: [
      User
    ],
    host: DB_HOST,
    logging: true,
    password: DB_PASSWORD,
    port: DB_PORT,
    synchronize: true,
    type: DB_DIALECT,
    username: DB_USER,
  } as any as ConnectionOptions);

  return connection;
}