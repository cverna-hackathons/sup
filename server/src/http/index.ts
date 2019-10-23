import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as Debugger from 'debug';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as logger from 'morgan';
import { route } from './router';

const debug = Debugger('sup:http')

dotenv.config();

export function start(): express.Application {
  const app: express.Application = express();
  const corsMiddleware = cors({ origin: '*', preflightContinue: true });
  const { NODE_PORT = 4000, NODE_HOST } = process.env
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(logger('dev'));
  app.use(corsMiddleware);
  app.options('*', corsMiddleware);
  route(app).listen(NODE_PORT);
  debug(`Server listening on: ${NODE_HOST}:${NODE_PORT}`);

  return app;
}
