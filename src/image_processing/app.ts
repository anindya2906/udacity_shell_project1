import { Router, Request, Response } from "express";

import { query_validations, validate } from "./middlewares/validations";


const router = Router();


router.get("/image", query_validations, validate, (req: Request, res: Response) => {
    res.send("Image API Endpoint");
});


export default router;