import { Request, Response } from 'express';
import * as userService from '../services/userService';

export async function eraseAccount(req: Request, res: Response) {
  const userId = res.locals.userId; // Do middleware de autenticação

  try {
    await userService.deleteUserAccount(userId);
    res.sendStatus(204); // Sucesso sem conteúdo
  } catch (err) {
    res.status(500).send('Internal server error');
  }
}