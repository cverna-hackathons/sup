import {
  Controller, Get, Response
} from '@decorators/express';
import {
  Response as ExpressResponse
} from 'express';
import { RequestError } from '../http/RequestError';

@Controller('/')
export class BaseController {
  @Get('/ping')
  public async ping(
    @Response() res: ExpressResponse
  ) {
    res.send('pong');
  }
  @Get('/throw')
  public async throw() {
    throw new RequestError('Example throw error');
  }
}