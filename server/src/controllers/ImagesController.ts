import {
  Controller, Delete, Get, Params, Post, Request, Response
} from '@decorators/express';
import * as Debugger from 'debug';
import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express';
import { getRepository } from 'typeorm';
import { getImageFeatures } from '../analyzers/ImageColorAnalyzer';
import { Image } from '../database/entities/Image';
import { ImageType } from '../database/entities/ImageType';
import { RequestError } from '../http/RequestError';
import { ImageUploadMiddleware } from '../imageUploads/ImageUploadMiddleware';
import { ImageStorage } from '../storage/ImageStorage';

const debug = Debugger('sup:ImagesController');

@Controller('/images')
export class ImagesController {
  @Get('/')
  public async list(
    @Response() res: ExpressResponse
  ) {
    const records = await getRepository(Image).find({
      order: { id: 'DESC' },
      relations: [ 'imageType' ],
    });

    res.send({
      images: await Promise.all(records.map(async ({
        id,
        imageType,
        fileName,
        filePath,
        src,
        storage,
      }) => ({
        extension: imageType.extension,
        features: (
          storage === 'S3'
            ? { noFeatures: true }
            : await getImageFeatures(filePath)
        ),
        fileName,
        filePath,
        id,
        src,
        type: imageType.mimeType,
      })))
    });
  }
  @Post('/', [ ImageUploadMiddleware ])
  public async create(
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse
  ) {
    const image = new Image();
    const imageType = await getRepository(ImageType).findOne({
      mimeType: req.file.mimetype
    })
    let success = false;

    if (req.file && imageType) {
      debug(`req.file`, req.file, Image.currentStorage);
      image.storage = Image.currentStorage;
      image.filePath = Image.storageFilePath(req.file);
      image.imageType = imageType;
      await getRepository(Image).save(image);
      success = true;
    }

    res.send({
      id: image.id,
      success
    });
  }
  @Delete('/:id')
  public async remove(
    @Response() res: ExpressResponse,
    @Params('id') id: string,
  ) {
    const image = await getRepository(Image).findOne(id);
    let removed = false

    if (image) {
      await image.remove();
      removed = true;
    }
    res.send({ success: removed });
  }
  @Get('/:id')
  public async getImage(
    @Response() res: ExpressResponse,
    @Params('id') id: string,
  ) {
    const image = await getRepository(Image).findOne(id);

    if (image) {
      const storage = new ImageStorage(image);
      debug(`getImage`, image.filePath)
      
      storage.getReadStream().pipe(res);
    } else {
      throw new RequestError(`Unable to find image [ID: ${id}]`, 400);
    }
  }
}