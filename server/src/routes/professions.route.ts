import { Router } from 'express';
import { getAllProfessions } from '../controllers';

const professionRouters: Router = Router();

professionRouters.get('/', getAllProfessions);

export default professionRouters;
