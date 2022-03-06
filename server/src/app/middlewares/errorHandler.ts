import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
const errorHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

export default errorHandler;
