import { Router } from 'express';
import { getAllProfessions } from '../controllers';
import cacheGetAllProfessions from '../middlewares/get-all-professions';

const professionRouters: Router = Router();

professionRouters.get('/', cacheGetAllProfessions, getAllProfessions);

export default professionRouters;
