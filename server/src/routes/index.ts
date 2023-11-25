import { Router } from 'express';
import professionRouters from './professions.route';
import playerRouters from './players.route';

const router: Router = Router();
router.use('/professions', professionRouters);
router.use('/players', playerRouters);

export default router;
