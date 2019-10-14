import Debug from 'debug';
import { Request, Response } from 'express';
import { RequestError } from './RequestError';

const debug = Debug('SUP:RequestError');

export function handle(error: Error, req: Request, res: Response, next: () => void) {
  debug(`Request error encountered on ${req.path}`, error);
  if (error instanceof RequestError) {
    res.status(error.customCode || 400).send({
      message: error.customMessage,
      success: false,
    });
  } else {
    res.status(500).send({
      message: 'Unknown error ocurred.',
      success: false
    });
  }

  return next();
}