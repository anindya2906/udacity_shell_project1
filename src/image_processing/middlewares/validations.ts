import path from 'path';
import { promises as fsPromises } from 'fs';
import { NextFunction, Request, Response } from 'express';
import { query, CustomValidator, validationResult } from 'express-validator';

import constants from '../constants';

// Validator middleware
const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errMsgs: string[] = [];
    errors.array().map((err) => {
      return errMsgs.push(err.msg);
    });
    res.status(400).json({ error: errMsgs });
  } else {
    next();
  }
};

// custom validator to check if the file exists
const fileNotFound: CustomValidator = async (filename: string) => {
  try {
    return await fsPromises.stat(path.join(constants.fullImagePath, filename));
  } catch {
    return await Promise.reject(new Error(`File ${filename} does not exist`));
  }
};

// Query parameter validations
const queryValidations = [
  // Filename
  query('filename')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Image filename not specified')
    .bail()
    .custom(fileNotFound),

  // Height
  query('height')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Image height not specified')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Height should be a positive integer'),

  // Width
  query('width')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Image width not specified')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Width should be a positive integer'),
];

export { queryValidations, validate };
