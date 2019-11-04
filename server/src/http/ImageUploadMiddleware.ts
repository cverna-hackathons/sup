import * as AWS from 'aws-sdk';
import {
  Middleware
} from '@decorators/express';
import * as Debug from 'debug';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import * as Multer from 'multer';
import * as MulterS3 from 'multer-s3';

const debug = Debug('sup:ImageUploaderMiddleware');

export class ImageUploadMiddleware implements Middleware {
  private upload: any;
  constructor() {
    debug('setting up');
    this.upload = Multer({
      dest: process.env.IMAGES_STATIC_DIR || '/tmp'
    });
  }
  public use(req: Request, res: Response, next: NextFunction): void {
    debug('applying');
    return this.upload.single('image')(req, res, next);
  }
}