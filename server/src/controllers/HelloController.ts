import { Request, Response } from 'express';

export async function ping(_req: Request, res: Response): Promise < void> {
  res.send('pong');
}