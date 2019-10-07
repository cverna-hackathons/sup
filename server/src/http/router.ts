import {
  Application,
  Request,
  Response,
  Router,
} from 'express';
import 'express-async-errors';
import * as HelloController from '../controllers/hello';
import * as Users from '../controllers/users';
import { handle } from './errorHandler';
import { RequestError } from './RequestError';

const router = (app: Application) => {
  // init your main express router
  const Api: Router = Router();

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
  Api.get('/users', Users.list)
  
  // handle GET request to /api/v1
  app.use('/api/v1', Api);

  app.use(handle);

  return app;
};

export default router;