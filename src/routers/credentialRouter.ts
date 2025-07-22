import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import {
  createCredential,
  getCredentials,
  deleteCredential,
} from '../controllers/credentialController';
import { validateSchema } from '../middlewares/validateSchema';
import { credentialSchema } from '../schemas/credentialSchema';

const credentialRouter = Router();

credentialRouter
  .post('/', authenticateToken, validateSchema(credentialSchema), createCredential)
  .get('/', authenticateToken, getCredentials)
  .delete('/:id', authenticateToken, deleteCredential);

export default credentialRouter;