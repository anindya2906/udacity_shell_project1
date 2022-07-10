import NodeCache from "node-cache";
import { NextFunction, Request, Response } from "express";

import constants from "../constants";

// Initialize Cache
const cache = new NodeCache({ stdTTL: 0});

// Middleware to send from cache
const sendFromCache = (req: Request, res: Response, next: NextFunction) => {
    const originalUrl: string = req.originalUrl;
    if(cache.has(originalUrl)){
        res.sendFile((cache.get(originalUrl) as string), { root: constants.root_path });
    }
    else {
        next();
    }
}

// Helper function to add values to cache
const addToCache = (key: string, value: string) => {
    cache.set(key, value);
}


export { sendFromCache, addToCache };