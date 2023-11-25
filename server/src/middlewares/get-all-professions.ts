import { NextFunction, Request, Response } from 'express';
import redisClient from '../databases/redis';

async function cacheGetAllProfessions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const key = req.originalUrl;
    const professions = await redisClient.get(key);

    if (professions !== null) {
      return res.json({
        fromCache: true,
        data: JSON.parse(professions),
      });
    } else {
      next();
    }
  } catch (error) {
    console.error('Middleware Error: ', error);
    return res.status(500).json({ msg: 'Some error has occured.' });
  }
}

export default cacheGetAllProfessions;
