import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); // Log do erro para debug

  // Tratamento específico para erros de validação (Joi)
  if (err.message.includes('already exists')) { // Parêntese fechado adicionado
    return res.status(409).send(err.message);
  }

  if (err.message.includes('not found')) { // Parêntese fechado adicionado
    return res.status(404).send(err.message);
  }

  // Erro genérico (500)
  res.status(500).send('Internal Server Error');
}