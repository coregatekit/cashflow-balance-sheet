import { Router } from 'express';
import professionRouters from './professions.route';
import playerRouters from './players.route';
import sessionRouters from './sessions.route';

const router: Router = Router();
router.use('/professions', professionRouters);
router.use('/players', playerRouters);
router.use('/sessions', sessionRouters);

export default router;
