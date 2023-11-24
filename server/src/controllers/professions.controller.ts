import { Request, Response } from 'express';

async function getAllProfessions(req: Request, res: Response) {
  res.json("All professions");
}

export {
  getAllProfessions,
};
