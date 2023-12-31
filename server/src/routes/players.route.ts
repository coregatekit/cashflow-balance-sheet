import { Router } from 'express';
import { createPlayer } from '../controllers';

const playerRouters: Router = Router();

playerRouters.post('/', createPlayer);

export default playerRouters;
