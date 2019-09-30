import { Request, Response } from 'express';

export default {
  async ping(req: Request, res: Response): Promise<void> {
    res.send({
      path: req.path,
      success: true
    })
  }
}
