import { getRepository } from 'typeorm';
import { Image } from '../database/entities/Image';
import {
  Response, Controller, Get,
} from '@decorators/express';
import { Response as ExpressResponse } from 'express';

@Controller('/images')
export class ImagesController {
  @Get('/')
  async getAll(@Response() res: ExpressResponse) {
    const records = await getRepository(Image).find();

    res.send({ images: records });
  }
}