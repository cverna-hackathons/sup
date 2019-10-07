import { Request, Response } from 'express';

export async function ping(req: Request, res: Response): Promise < void> {
  res.send({
    path: req.path,
    success: true
  })
}