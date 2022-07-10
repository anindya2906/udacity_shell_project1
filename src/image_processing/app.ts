import { Router, Request, Response } from "express";

import { query_validations, validate } from "./middlewares/validations";
import { sendFromCache, addToCache } from "./middlewares/caching";
import resize_image from "./processing/resizing";
import constants from "./constants";


const router = Router();

const middlewares = [...query_validations, validate, sendFromCache];

router.get("/image", middlewares, async (req: Request, res: Response) => {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    try{
        const outImage = await resize_image(filename, width, height);
        addToCache(req.originalUrl, outImage);
        res.sendFile(outImage, { root: constants.root_path});
    }
    catch (error) {
        res.send(error)
    }
});


export default router;