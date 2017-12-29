import { Router } from 'express';
import userController from '../modules/users/controllers/user.controller';
import rolController from '../modules/users/controllers/rol.controller';
import authenticateService from '../modules/users/services/authenticate.service';

const userRouter = Router();

userRouter.use(authenticateService.authenticate);

userRouter.route('/')
    .get(userController.index)
    .post(userController.newUser);

userRouter.route('/all')
    .get(userController.allUsers);

userRouter.route('/rols')
    .get(rolController.getAllRols)
    .post(rolController.createRol);

userRouter.route('/rols/disable')
    .get(rolController.getAllRolsDisabled);

userRouter.put('/rols/active/:rolId', rolController.activeRol);

userRouter.route('/rols/:rolId')
    .get(rolController.findRolById)
    .delete(rolController.disableRol);

export default userRouter;