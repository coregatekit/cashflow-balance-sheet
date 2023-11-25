import { Request, Response } from 'express';
import Profession from '../models/profession.model';
import redisClient from '../databases/redis';
import { CACHE_TIME } from '../configs';

async function getAllProfessions(req: Request, res: Response) {
  const key = req.originalUrl;

  try {
    const professions = await Profession.find().sort({ profression: 1 });

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
