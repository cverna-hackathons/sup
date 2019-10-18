import {
  Application,
  Router,
} from 'express';
import 'express-async-errors';
import { BaseController } from '../controllers/BaseController';
import { ImagesController } from '../controllers/ImagesController';
import { handle } from './ErrorHandler';
import { attachControllers } from '@decorators/express';

export const route = (app: Application) => {
  const apiRouter = Router();
  // Top level routes
  attachControllers(app, [ BaseController ]);
  // API routes
  // handle GET request to /api/v1  
  attachControllers(apiRouter, [ ImagesController ]);
  
  app.use('/api/v1', apiRouter);
  app.use(handle);

  return app;
};