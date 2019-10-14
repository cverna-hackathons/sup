import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../database/entities/User';

export async function list(req: Request, res: Response) {
  const users = getRepository(User);
  const records = await users.find();

  res.send({
    path: req.path,
    users: records,
  });
}