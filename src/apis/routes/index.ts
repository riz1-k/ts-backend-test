import { Router } from 'express';
import userAuthRouter from './user/user.routes';

const routes = Router();

routes.use('/auth', userAuthRouter);

export default routes;
