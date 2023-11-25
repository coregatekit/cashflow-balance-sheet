import { Router } from 'express';
import {
  createSession,
  deleteSession,
  getAllSessions,
  getSessionDetail,
  removePlayerFromSession,
} from '../controllers/sessions.controller';

const sessionRouters: Router = Router();

sessionRouters.post('/', createSession);
sessionRouters.get('/', getAllSessions);
sessionRouters.get('/:key', getSessionDetail);
sessionRouters.post('/:key/remove-player', removePlayerFromSession);
sessionRouters.delete('/', deleteSession);

export default sessionRouters;
