import { Request, Response } from 'express';
import Profession from '../models/profession.model';

async function getAllProfessions(req: Request, res: Response) {
  const professions = await Profession.find().sort({ profression: 1 });
  res.json(professions);
}

export {
  getAllProfessions,
};
