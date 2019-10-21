import { getRepository } from 'typeorm';
import { Image } from '../database/entities/Image';
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
    const records = await getRepository(Image).find();

    res.send({ images: records });
  }
  @Post('/', [ ImageUploadMiddleware ])
  async create(
    @Request() _req: ExpressRequest,
    @Response() res: ExpressResponse    
  ) {
    const image = new Image();

    image.filePath = `/new-image-path/image-${Date.now()}.png`;
    await getRepository(Image).save(image);

    res.send({ id: image.id });
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