import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import AuthMiddleware from './app/middlewares/auth';

const router = new Router();

router.post('/user', UserController.store);
router.post('/session', SessionController.store);

router.use(AuthMiddleware);

router.put('/user', UserController.update);

export default router;
