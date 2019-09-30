import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as logger from 'morgan';

import routes from './router';

dotenv.config();

const app: express.Application = express();
const corsMiddleware = cors({ origin: '*', preflightContinue: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(corsMiddleware);
app.options('*', corsMiddleware);
routes(app).listen(process.env.PORT);

export default app;


