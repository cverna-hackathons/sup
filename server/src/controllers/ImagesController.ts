import {
  Controller, Delete, Get, Params, Post, Request, Response
} from '@decorators/express';
import {
  Request as ExpressRequest,
  Response as ExpressResponse
} from 'express';
import { getRepository } from 'typeorm';
import { getImageFeatures } from '../analyzers/ImageColorAnalyzer';
import { Image } from '../database/entities/Image';
import { ImageType } from '../database/entities/ImageType';
import { ImageUploadMiddleware } from '../http/ImageUploadMiddleware';
import * as Debugger from 'debug';

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
      }) => ({
        extension: imageType.extension,
        features: await getImageFeatures(filePath),
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
      debug(`req.file`, req.file);
      image.filePath = `${req.file.path}`;
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
}