import { Schema, Types, model } from 'mongoose';

export type PlayerType = {
  name: string;
  dreams: string;
  prefession: Types.ObjectId;
  passive_income: number;
  total_incomes: number;
  total_expenses: number;
  cashflow: number;
};

const playerSchema = new Schema<PlayerType>({
  name: { type: String, required: true },
  dreams: { type: String, required: true },
  prefession: { type: Schema.Types.ObjectId, ref: 'professions' },
  passive_income: { type: Number, default: 0 },
  total_incomes: { type: Number, default: 0 },
  cashflow: { type: Number, default: 0 },
});

const Player = model<PlayerType>('players', playerSchema);

export default Player;
