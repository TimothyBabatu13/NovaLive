import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      console.log(req.body)
      console.log(schema.parse(req.body))
      next();
    } catch (err: any) {
        console.log(err.errors)
      return res.status(400).json({
        success: false,
        errors: err.errors.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }
  };