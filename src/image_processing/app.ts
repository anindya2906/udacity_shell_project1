import { Router, Request, Response } from 'express';

import { queryValidations, validate } from './middlewares/validations';
import { sendFromCache, addToCache } from './middlewares/caching';
import resizeImage from './processing/resizing';
import constants from './constants';

const router = Router();

const middlewares = [...queryValidations, validate, sendFromCache];

router.get(
  '/image',
  middlewares,
  async (req: Request, res: Response): Promise<void> => {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    try {
      const outImage = await resizeImage(filename, width, height);
      addToCache(req.originalUrl, outImage);
      res.status(200).sendFile(outImage, { root: constants.rootPath });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export default router;
