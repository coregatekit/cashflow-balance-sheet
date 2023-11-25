import { Schema, model, now } from 'mongoose';
import { randomUUID } from 'crypto';

type PlayerSessionType = {
  playerId: string;
  name: string;
  cashflow: number;
};

type SessionType = {
  session: string;
  createdAt: Date;
  totalPlayer: number;
  players: PlayerSessionType[];
};

const sessionSchema = new Schema<SessionType>({
  session: { type: String, default: randomUUID() },
  createdAt: { type: Date, default: now() },
  totalPlayer: { type: Number, default: 0 },
  players: [
    {
      playerId: {
        type: Schema.Types.ObjectId,
        ref: 'players',
      },
      name: { type: String, required: true },
      cashflow: { type: Number, default: 0 },
    },
  ],
});

const Session = model<SessionType>('sessions', sessionSchema);

export default Session;

