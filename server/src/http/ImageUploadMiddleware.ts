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
import * as UniqueId from 'uniqid';

const debug = Debug('sup:ImageUploadMiddleware');
const {
  IMAGES_STORAGE
} = process.env

export class ImageUploadMiddleware implements Middleware {
  private upload: any;
  constructor() {
    debug('setting up');
    this.upload = IMAGES_STORAGE === 'S3' 
      ? Multer({
        storage: MulterS3({
          s3: new AWS.S3({
            accessKeyId: process.env.aws_access_key_id,
            secretAccessKey: process.env.aws_secret_access_key,
          }),
          bucket: (process.env.IMAGES_S3_BUCKET || 'sup-storage'),
          key(_req, _file, done) {
            return done(null, UniqueId());
          }
        })
      })
      : Multer({
        dest: (process.env.IMAGES_STATIC_DIR || '/tmp')
      });
  }
  public use(req: Request, res: Response, next: NextFunction): void {
    debug('applying');
    return this.upload.single('image')(req, res, next);
  }
}