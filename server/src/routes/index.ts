import { Router } from 'express';
import professionRouters from './professions.route';

const router: Router = Router();
router.use('/professions', professionRouters);

export default router;
