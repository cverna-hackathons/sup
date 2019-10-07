import {
  Application,
  // Router,
  Request,
  Response
} from 'express';
import * as HelloController from '../controllers/hello';

const router = (app: Application) => {
  // init your main express router
  // const apiRouter: Router = Router();

  // handle GET request to /api/v1
  app.get('/', (req: Request, res: Response) => {
    res.send({
      message: `Main route: ${req.path}`
    });
  });

  app.get('/ping', HelloController.ping);

  // app.use('/api/v1', apiRouter);

  return app;
};

export default router;