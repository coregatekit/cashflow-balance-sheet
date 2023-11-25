import { Request, Response } from 'express';
import Player from '../models/player.model';
import Session from '../models/session.model';
import Profession from '../models/profession.model';

type createPlayerDto = {
  current_sessions: string;
  name: string;
  dreams: string;
  choose_profession: string;
};

async function createPlayer(req: Request, res: Response) {
  const { current_sessions, name, dreams, choose_profession }: createPlayerDto = req.body;

  const session = await Session.findOne({ session: current_sessions });

  if (session) {
    const profession = await Profession.findOne({ profession: choose_profession });
    if (profession) {
      const player = await Player.create({
        name,
        dreams,
        profession
      });
      player.total_incomes = profession.income.salary;
      player.total_expenses = profession.expenses.reduce((prev, expense) => prev + expense.amount, 0);
      player.cashflow_per_month = player.total_incomes - player.total_expenses;
      player.save();

      session.players.push({
        player_id: player.id,
        name: player.name,
        cashflow: player.cashflow_per_month,
        host: session.total_player === 0 ? true : false,
      });
      session.total_player = session.players.length;
      session.save();

      return res.status(201).json(player);
    }
    return res.status(400).json({ msg: 'profession not found' });
  } else {
    return res.status(400).json({ msg: 'session not found!' });
  }
}

export {
  createPlayer,
};
