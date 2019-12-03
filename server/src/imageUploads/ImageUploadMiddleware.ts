import {
  Middleware
} from '@decorators/express';
import * as Debug from 'debug';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { Image } from '../database/entities/Image';
import { LocalImageUpload } from './LocalImageUpload';
import { S3ImageUpload } from './S3ImageUpload';

const debug = Debug('sup:ImageUploadMiddleware');
const {
  IMAGES_STORAGE
} = process.env

export class ImageUploadMiddleware implements Middleware {
  private upload: any;
  constructor() {
    debug('setting up');
    this.upload = IMAGES_STORAGE === Image.StorageEnum.S3
      ? S3ImageUpload
      : LocalImageUpload;
  }
  public use(req: Request, res: Response, next: NextFunction): void {
    debug('applying');
    return this.upload.single('image')(req, res, next);
  }
}