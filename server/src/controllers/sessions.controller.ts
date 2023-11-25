import { Request, Response } from 'express';
import { SessionStatus } from '../models/session.model';
import {
  createNewSession,
  deleteTheSession,
  findAllSessions,
  findSessionDetail,
  removePlayer,
  updateStatus,
} from '../services';

async function createSession(req: Request, res: Response) {
  const session = await createNewSession();
  return res.status(201).json({
    data: session,
  });
}

async function getAllSessions(req: Request, res: Response) {
  const sessions = await findAllSessions();
  return res.status(201).json({
    data: sessions,
  });
}

async function getSessionDetail(req: Request, res: Response) {
  const key = req.params.key as string;
  const session = await findSessionDetail(key);

  if (!session) {
    return res.status(400).json({
      msg: 'session not found',
    });
  }

  return res.status(200).json({
    data: session,
  });
}

async function removePlayerFromSession(req: Request, res: Response) {
  const key = req.params.key as string;
  const player = req.query.player as string;

  const session = await removePlayer(key, player);

  if (session) {
    return res.status(200).json({
      data: session,
    });
  }

  return res.status(400).json({
    msg: session,
  });
}

async function deleteSession(req: Request, res: Response) {
  const key = req.query.key as string;

  const session = await deleteTheSession(key);

  if (session) {
    return res.status(400).json({
      msg: session,
    });
  }
  return res.status(204).send();
}

async function updateSessionStatus(req: Request, res: Response) {
  const key = req.query.key as string;
  const status = req.query.status as string;

  if (!status || !(status in SessionStatus)) {
    return res.status(400).json({
      msg: 'invalid type of session state',
    });
  }

  const session = await updateStatus(key, status as SessionStatus);

  if (session) {
    return res.status(200).json({
      msg: session,
    });
  }

  return res.status(400).json({
    msg: session,
  });
}

export {
  createSession,
  getAllSessions,
  getSessionDetail,
  removePlayerFromSession,
  deleteSession,
  updateSessionStatus,
};
