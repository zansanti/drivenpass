import { Request, Response } from 'express';
import * as credentialService from '../services/credentialService';

export async function createCredential(req: Request, res: Response) {
  const { title, url, username, password } = req.body;
  const userId = res.locals.userId; // Do middleware de autenticação

  try {
    const credential = await credentialService.createCredential({
      title,
      url,
      username,
      password,
      userId,
    });
    res.status(201).json(credential);
  } catch (err) {
    if (err instanceof Error && err.message === 'Title already exists') {
      return res.status(409).send('Title already in use');
    }
    res.status(500).send('Internal server error');
  }
}

export async function getCredentials(req: Request, res: Response) {
  const userId = res.locals.userId;
  const credentials = await credentialService.getCredentials(userId);
  res.status(200).json(credentials);
}

export async function deleteCredential(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    await credentialService.deleteCredential(Number(id), userId);
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof Error && err.message === 'Credential not found') {
      return res.status(404).send('Credential not found');
    }
    res.status(500).send('Internal server error');
  }
}