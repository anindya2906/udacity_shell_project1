import { promises as fsPromises, stat } from 'fs';
import { NextFunction, Request, Response } from "express";
import { query, CustomValidator, validationResult } from "express-validator";
import path from 'path';
import fs from 'fs';

// Validator middleware
const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({"message": errors.array()});
    }
    else{
        next();
    }
}

// custom validator to check if the file exists
const fileNotFound: CustomValidator = async (filename: string) => {
    try {
        return await fsPromises.stat(path.join("assets/full", filename));
    } catch {
        return await Promise.reject(`File ${filename} does not exist`);
    }
}

// Query parameter validations
const query_validations = [
    // Filename
    query('filename').exists({checkNull: true, checkFalsy:true}).withMessage("Image filename not specified !").bail()
    .custom(fileNotFound),

    // Height
    query('height').exists({checkNull: true, checkFalsy:true}).withMessage("Image height not specified").bail()
    .isInt({ min: 1 }).withMessage("Height should be a positive integer and greater than 0"),

    // Width
    query('width').exists({checkNull: true, checkFalsy:true}).withMessage("Image width not specified").bail()
    .isInt({ min: 1 }).withMessage("Width should be a positive integer and greater than 0"),
];


export {query_validations, validate};