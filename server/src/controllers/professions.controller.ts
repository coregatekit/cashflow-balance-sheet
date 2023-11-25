import { Request, Response } from 'express';
import redisClient from '../databases/redis';
import { CACHE_TIME } from '../configs';
import { findAllProfessions } from '../services';

async function getAllProfessions(req: Request, res: Response) {
  const key = req.originalUrl;

  try {
    const professions = await findAllProfessions();

    await redisClient.setEx(key, CACHE_TIME, JSON.stringify(professions));

    return res.json({
      fromCache: false,
      data: professions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Some error has occured.' });
  }
}

export { getAllProfessions };
