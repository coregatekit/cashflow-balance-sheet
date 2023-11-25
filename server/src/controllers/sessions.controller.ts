import { Request, Response } from 'express';
import { uuid } from 'uuidv4';
import Session from '../models/session.model';
import Player from '../models/player.model';

async function createSession(req: Request, res: Response) {
  const session = await Session.create({ session: uuid().slice(0, 6).toUpperCase() });
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

async function removePlayerFromSession(req: Request, res: Response) {
  const key = req.params.key as string;
  const player = req.query.player as string;

  const session = await Session.findOne({ session: key });

  if (session) {
    const index = session.players.findIndex((p) => p.name === player);

    if (index !== -1) {
      const isHost = session.players[index].host;

      if (isHost) {
        return res.status(400).json({
          msg: "host player can not be remove",
        });
      }

      session.players.splice(index, 1);
      session.save();

      await Player.findOneAndDelete({ name: player });

      return res.status(200).json({
        data: session,
      });
    }
  }

  return res.status(400).json({
    msg: 'session not found',
  });
}

async function deleteSession(req: Request, res: Response) {
  const key = req.query.key as string;

  const session = await Session.findOne({ session: key });

  if (session) {
    const players: string[] = [];
    session.players.map((player) => {
      players.push(player.name);
    });

    await Player.deleteMany({ name: { $in: players } });
    console.info("players deleted");

    await Session.deleteOne({ session: key });
    console.info("session deleted");

    return res.status(204).send();
  }

  return res.status(400).json({
    msg: 'session not found',
  });
}

export {
  createSession,
  getAllSessions,
  getSessionDetail,
  removePlayerFromSession,
  deleteSession,
};
