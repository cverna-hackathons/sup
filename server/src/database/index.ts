import * as dotenv from 'dotenv';
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

dotenv.config();

export async function connect(): Promise<Connection> {
  const {
    DB_DIALECT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
  } = process.env
  const connection = await createConnection({
    type: DB_DIALECT,
    host: DB_HOST,
    host: DB_PORT,
    username: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    synchronize: true,
    logging: true,
  })

  return connection
}