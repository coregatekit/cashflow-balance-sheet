import { Schema, model, now } from 'mongoose';

export enum SessionStatus {
  WAITING = 'WAITING',
  STARTED = 'STARTED',
  END = 'END',
}

type PlayerSessionType = {
  player_id: string;
  name: string;
  cashflow: number;
  host: boolean;
};

type SessionType = {
  session: string;
  created_at: Date;
  total_player: number;
  players: PlayerSessionType[];
  status: SessionStatus;
};

const sessionSchema = new Schema<SessionType>({
  session: { type: String, default: '' },
  created_at: { type: Date, default: now() },
  total_player: { type: Number, default: 0 },
  players: [
    {
      player_id: {
        type: Schema.Types.ObjectId,
        ref: 'players',
      },
      name: { type: String, required: true },
      cashflow: { type: Number, default: 0 },
      host: { type: Boolean, default: false },
    },
  ],
  status: { type: String, enum: SessionStatus, default: SessionStatus.WAITING },
});

const Session = model<SessionType>('sessions', sessionSchema);

export default Session;
