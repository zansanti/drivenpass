// src/middlewares/validateParams.ts
import { Request, Response, NextFunction } from 'express';

export function validateIdParam(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "ID deve ser um número positivo" });
  }
  
  next();
}