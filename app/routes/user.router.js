import { Router } from 'express';
import userController from '../modules/users/controllers/user.controller';
import rolController from '../modules/users/controllers/rol.controller';
import authenticateService from '../modules/users/services/authenticate.service';

const userRouter = Router();

userRouter.post('/login', authenticateService.login);

userRouter.use(authenticateService.authenticate);

userRouter.route('/')
    .get(userController.index)
    .post(userController.newUser);

userRouter.route('/all')
    .get(userController.allUsers);

userRouter.route('/rols')
    .get(rolController.listRols)
    .post(rolController.newRol);

userRouter.route('/rols/disable')
    .get(rolController.listRolsDisables);

userRouter.route('/rols/:rolId')
    .get(rolController.viewRol)
    .put()
    .delete(rolController.deleteRol);

export default userRouter;