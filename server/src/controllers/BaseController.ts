import {
  Response, Controller, Get, Request
} from '@decorators/express';
import { RequestError } from '../http/RequestError';
import {
  Response as ExpressResponse,
  Request as ExpressRequest
} from 'express';

@Controller('/')
export class BaseController {
  @Get('/ping')
  async ping(
    @Request() _req: ExpressRequest,
    @Response() res: ExpressResponse
  ) {
    res.send('pong');
  }
  @Get('/throw')
  async throw() {
    throw new RequestError('Example throw error');
  }
}