import { Router } from 'express';
import { createSession, getAllSessions, getSessionDetail } from '../controllers/sessions.controller';

const sessionRouters: Router = Router();

sessionRouters.post('/', createSession);
sessionRouters.get('/', getAllSessions);
sessionRouters.get('/:key', getSessionDetail);

export default sessionRouters;
