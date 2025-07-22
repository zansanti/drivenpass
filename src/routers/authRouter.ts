import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController';
import { validateSchema } from '../middlewares/validateSchema';
import { signUpSchema, signInSchema } from '../schemas/authSchema';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(signUpSchema), signUp);
authRouter.post('/sign-in', validateSchema(signInSchema), signIn);


export default authRouter;


