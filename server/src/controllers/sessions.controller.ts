import { Request, Response } from 'express';
import { uuid } from 'uuidv4';
import Session from '../models/session.model';

async function createSession(req: Request, res: Response) {
  const session = await Session.create({session: uuid()});
  return res.status(201).json({
    data: session,
  });
}

async function getAllSessions(req: Request, res: Response) {
  const sessions = await Session.find();
  return res.status(201).json({
    data: sessions,
  });
}

async function getSessionDetail(req: Request, res: Response) {
  const key = req.params.key as string;
  const session = await Session.findOne({ session: key });

  if (!session) {
    return res.status(400).json({
      msg: 'session not found',
    });
  }
  return res.status(200).json({
    data: session,
  });
}

export {
  createSession,
  getAllSessions,
  getSessionDetail,
};
