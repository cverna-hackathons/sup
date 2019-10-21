import {
  Middleware
} from '@decorators/express';
import {
  Response,
  Request,
  NextFunction
} from 'express';
import * as Multer from 'multer';
import * as Debug from 'debug';

const debug = Debug('sup:ImageUploaderMiddleware');

export class ImageUploadMiddleware implements Middleware {
  private upload: any;
  constructor() {
    debug('setting up');
    this.upload = Multer({ dest: '/tmp/' });
  }
  public use(req: Request, res: Response, next: NextFunction): void {
    debug('applying');
    return this.upload.single('image')(req, res, next);
  }
}