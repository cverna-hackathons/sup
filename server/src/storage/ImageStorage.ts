import * as AWS from 'aws-sdk';
import { createReadStream } from 'fs';
// import * as Debug from 'debug';
import { Image } from '../database/entities/Image';

const IMAGES_BUCKET = (process.env.IMAGES_S3_BUCKET || 'sup-storage')

export class ImageStorage {
  public static bucket: string = IMAGES_BUCKET;
  public S3Service!: AWS.S3;
  private record: Image;
  constructor(image: Image) {
    this.record = image;
    this.S3Service = new AWS.S3({
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key,
    })
  }
  public getReadStream() {
    if (this.record.storageIsS3) {
      return this.getS3ObjectReadStream();
    } else {
      return this.getLocalReadStream();
    }
  }
  private getLocalReadStream() {
    return createReadStream(this.record.filePath);
  }
  private getS3ObjectReadStream() {
    return this.S3Service.getObject({
      Bucket: IMAGES_BUCKET,
      Key: this.record.fileName,      
    }).createReadStream();
  }
  
}