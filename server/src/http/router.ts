import {
  Application,
  Request,
  Response,
  Router,
} from 'express';
import 'express-async-errors';
import * as HelloController from '../controllers/HelloController';
import { ImagesController } from '../controllers/ImagesController';
import { handle } from './ErrorHandler';
import { RequestError } from './RequestError';
import { attachControllers } from '@decorators/express';

export const route = (app: Application) => {
  const apiRouter = Router();

  // Generic routes
  app.get('/', (req: Request, res: Response) => {
    res.send({
      message: `Main route: ${req.path}`
    });
  });
  // Error throwing route
  app.get('/throw', () => {
    throw new RequestError('Example throw error');
  });
  
  app.get('/ping', HelloController.ping);

  // API routes  
  // handle GET request to /api/v1  
  attachControllers(apiRouter, [ ImagesController ]);
  
  app.use('/api/v1', apiRouter);
  app.use(handle);

  return app;
};