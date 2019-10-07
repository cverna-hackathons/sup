import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as logger from 'morgan';

import routes from './router';

dotenv.config();

export function start() {
  const Server: express.Application = express();
  const corsMiddleware = cors({ origin: '*', preflightContinue: true });
  const { PORT } = process.env
  
  Server.use(bodyParser.urlencoded({ extended: false }));
  Server.use(bodyParser.json());
  Server.use(logger('dev'));
  Server.use(corsMiddleware);
  Server.options('*', corsMiddleware);
  routes(Server).listen(PORT, () => {
    // tslint:disable-next-line: no-console
    console.info(`Server listening on port ${PORT}`)
  });

  return Server;
}
