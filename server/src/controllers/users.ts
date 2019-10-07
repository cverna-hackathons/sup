import { Request, Response } from 'express';

export async function list(req: Request, res: Response) {
  res.send({
    path: req.path,
    users: [],
  })
}