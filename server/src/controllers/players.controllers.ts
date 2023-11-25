import { Request, Response } from 'express';
import { createNewPlayer } from '../services';

export type CreatePlayerDto = {
  current_sessions: string;
  name: string;
  dreams: string;
  choose_profession: string;
};

async function createPlayer(req: Request, res: Response) {
  const payload: CreatePlayerDto = req.body as CreatePlayerDto;

  const player = await createNewPlayer(payload);

  if (typeof player === 'string') {
    return res.status(400).json({
      msg: player,
    });
  }

  return res.status(201).json({
    data: player,
  });
}

export { createPlayer };
