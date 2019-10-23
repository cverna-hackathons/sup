import { getRepository } from 'typeorm';
import { Image } from '../database/entities/Image';
import { ImageType } from '../database/entities/ImageType';
import {
  Response, Controller, Get, Post, Request, Delete, Params
} from '@decorators/express';
import {
  Response as ExpressResponse,
  Request as ExpressRequest
} from 'express';
import { ImageUploadMiddleware } from '../http/ImageUploadMiddleware';

@Controller('/images')
export class ImagesController {
  @Get('/')
  async list(
    @Response() res: ExpressResponse
  ) {
    const records = await getRepository(Image).find({
      relations: [ 'imageType' ]
    });

    res.send({
      images: records.map(({
        id,
        imageType,
        fileName,
        filePath,
        src,
      }) => ({
        extension: imageType.extension,
        fileName,
        filePath,
        id,
        type: imageType.mimeType,
        src,
      })).sort((a, b) => b.id - a.id)
    });
  }
  @Post('/', [ ImageUploadMiddleware ])
  async create(
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse
  ) {
    const image = new Image();
    const imageType = await getRepository(ImageType).findOne({
      mimeType: req.file.mimetype
    })
    let success = false;

    if (req.file && imageType) {
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
  async remove(
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