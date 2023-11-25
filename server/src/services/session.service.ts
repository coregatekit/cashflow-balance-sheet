import { uuid } from 'uuidv4';
import Session, { SessionStatus, SessionType } from '../models/session.model';
import Player from '../models/player.model';

async function findAllSessions(): Promise<SessionType[]> {
  return await Session.find();
}

async function findSessionDetail(session: string): Promise<SessionType | null> {
  return await Session.findOne({ session });
}

async function createNewSession(): Promise<SessionType> {
  return await Session.create({
    session: uuid().slice(0, 6).toUpperCase(),
  });
}

async function removePlayer(
  session: string,
  player: string,
): Promise<SessionType | null | string> {
  const currentSession = await Session.findOne({ session });

  if (currentSession) {
    const index = currentSession.players.findIndex((p) => p.name === player);

    if (index !== -1) {
      const isHost = currentSession.players[index].host;

      if (isHost) {
        return 'host player can not be remove';
      }

      currentSession.players.splice(index, 1);
      currentSession.save();

      await Player.findOneAndDelete({ name: player });

      return currentSession;
    }
  }

  return null;
}

async function deleteTheSession(session: string): Promise<null | string> {
  const currentSession = await Session.findOne({ session });

  if (!currentSession) {
    return 'session not found';
  }
  const players: string[] = [];
  currentSession.players.map((player) => {
    players.push(player.name);
  });

  await Player.deleteMany({ name: { $in: players } });
  console.info('players deleted');

  await Session.deleteOne({ session });
  console.info('session deleted');

  return null;
}

async function updateStatus(
  session: string,
  status: SessionStatus,
): Promise<string> {
  const currentSession = await Session.findOne({ session });

  if (currentSession) {
    await currentSession.updateOne({ status });
    return 'session updated';
  }
  return 'session not found';
}

export {
  createNewSession,
  findAllSessions,
  findSessionDetail,
  removePlayer,
  deleteTheSession,
  updateStatus,
};
