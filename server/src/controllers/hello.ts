import * as express from 'express';

export default {
  async ping(req: express.Request, res: express.Response): Promise<void> {
    res.send({
      path: req.path,
      success: true
    })
  }
}
