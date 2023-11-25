import { Schema, model } from 'mongoose';
import { PlayerType } from './player.model';
import { randomUUID } from 'crypto';

type SessionType = {
  key: string;
  createdAt: Date;
  totalPlayer: number;
  players: PlayerType[];
};

const sessionSchema = new Schema<SessionType>({
  key: { type: String, default: randomUUID() },
  totalPlayer: { type: Number, default: 0 },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'players',
    },
  ],
});

const Session = model<SessionType>('sessions', sessionSchema);

export default Session;

