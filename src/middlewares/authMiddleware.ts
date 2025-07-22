import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interface para o payload do token
interface JwtUserPayload {
  userId: number; // Ou string, dependendo do seu ID
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Optional chaining para segurança

  if (!token) return res.status(401).send('Token não fornecido');

  jwt.verify(token, process.env.JWT_SECRET!, (err, payload) => {
    if (err) return res.status(403).send('Token inválido ou expirado');
    
    // Type guard para garantir que o payload tem a estrutura esperada
    if (typeof payload === 'object' && 'userId' in payload) {
      const userPayload = payload as JwtUserPayload;
      res.locals.userId = userPayload.userId;
      return next();
    }

    res.status(403).send('Estrutura do token inválida');
  });
}