import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as Debugger from 'debug';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as logger from 'morgan';
import { route } from './router';

dotenv.config();

const debug = Debugger('sup:http')
const { NODE_PORT = 4000, NODE_HOST } = process.env

export function start(): express.Application {
  const app: express.Application = express();
  const corsMiddleware = cors({ origin: '*', preflightContinue: true });
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    '/images',
    express.static(
      process.env.IMAGES_STATIC_DIR || '/tmp'
    )
  );
  app.use(logger('dev'));
  app.use(corsMiddleware);
  app.options('*', corsMiddleware);
  route(app).listen(NODE_PORT);
  debug(`Server listening on: ${NODE_HOST}:${NODE_PORT}`);

  return app;
}
