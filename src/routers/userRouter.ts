import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { eraseAccount } from '../controllers/userController';

const userRouter = Router();

userRouter.delete('/erase', authenticateToken, eraseAccount);

export default userRouter;