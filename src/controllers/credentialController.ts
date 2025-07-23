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

export async function updateCredential(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.userId;
  const { title, url, username, password } = req.body;

  try {
    await credentialService.updateCredential(Number(id), userId, {
      title,
      url,
      username,
      password,
    });
    res.sendStatus(204); // No Content
  } catch (err) {
    if (err instanceof Error) {
      switch (err.message) {
        case 'Credential not found':
          return res.status(404).send(err.message);
        case 'Title already exists':
          return res.status(409).send(err.message);
        default:
          console.error('Unexpected error:', err);
          return res.status(500).send('Internal server error');
      }
    }
    // Caso raro onde o erro não é do tipo Error
    console.error('Non-Error exception:', err);
    res.status(500).send('Internal server error');
  }
}