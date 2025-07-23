import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import {
  createCredential,
  getCredentials,
  deleteCredential,
  updateCredential,
} from '../controllers/credentialController';
import { validateSchema } from '../middlewares/validateSchema';
import { credentialSchema } from '../schemas/credentialSchema';
import { validateIdParam } from '../middlewares/validateParams';


const credentialRouter = Router();

credentialRouter
  .post('/', authenticateToken, validateSchema(credentialSchema), createCredential)
  .get('/', authenticateToken, getCredentials)
  .delete('/:id', authenticateToken, validateIdParam, deleteCredential)
  .put('/:id', authenticateToken, validateIdParam, validateSchema(credentialSchema), updateCredential);


export default credentialRouter;