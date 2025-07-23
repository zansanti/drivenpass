import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function signUp(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const user = await authService.createUser({ name, email, password }); 
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    if (err instanceof Error && err.message === 'Email already exists') {
      return res.status(409).send('Email already registered');
    }
    res.status(500).send('Internal server error');
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const token = await authService.validateUser(req.body.email, req.body.password);
    res.status(200).json({ token });
  } catch (err) {
  if (err instanceof Error && err.message === 'Email not found') {
      return res.status(404).send('Email not registered');
    }
   if (err instanceof Error && err.message === 'Invalid password') {
      return res.status(401).send('Incorrect password');
    }
    res.status(500).send('Internal server error');
  }
}