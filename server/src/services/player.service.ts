import { CreatePlayerDto } from '../controllers';
import Player, { PlayerType } from '../models/player.model';
import Profession from '../models/profession.model';
import Session from '../models/session.model';

async function createNewPlayer(
  dto: CreatePlayerDto,
): Promise<string | PlayerType> {
  const session = await Session.findOne({ session: dto.current_sessions });

  if (session) {
    const playerExist = session.players.some((p) => p.name === dto.name);

    if (playerExist) {
      return `player ${dto.name} already exist`;
    }

    const profession = await Profession.findOne({
      profession: dto.choose_profession,
    });

    if (profession) {
      const player = await Player.create({
        name: dto.name,
        dreams: dto.dreams,
        prefession: profession,
      });
      player.total_incomes = profession.income.salary;
      player.total_expenses = profession.expenses.reduce(
        (prev, expense) => prev + expense.amount,
        0,
      );
      player.cashflow_per_month = player.total_incomes - player.total_expenses;
      await player.save();

      session.players.push({
        player_id: player.id,
        name: player.name,
        cashflow: player.cashflow_per_month,
        host: session.total_player === 0 ? true : false,
      });
      session.total_player = session.players.length;
      await session.save();

      return player;
    }

    return 'profession not found';
  }

  return 'session not found';
}

export { createNewPlayer };
