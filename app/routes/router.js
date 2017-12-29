import { Router } from 'express';
import userRouter from './user.router';
import authenticateService from '../modules/users/services/authenticate.service';

var router = Router();

router.post('/api/login', authenticateService.login);
router.use('/api/users', userRouter);

export default router;