import * as AWS from 'aws-sdk';
import * as Debug from 'debug';
import * as Multer from 'multer';
import * as MulterS3 from 'multer-s3';
import * as UniqueId from 'uniqid';

const debug = Debug('sup:s3imageUpload')

export const S3ImageUpload = Multer({
  storage: MulterS3({
    bucket: (process.env.IMAGES_S3_BUCKET || 'sup-storage'),
    s3: new AWS.S3({
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key,
    }),
    key(_, __, done) {
      debug('key!')
      return done(null, UniqueId());
    }
  })
})