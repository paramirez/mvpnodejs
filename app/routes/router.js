import { Router } from 'express';
import userRouter from './user.router';

var router = Router();

router.use('/api/users', userRouter);

export default router;