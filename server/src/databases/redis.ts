import { createClient } from 'redis';
import { REDIS_HOST, REDIS_PASS, REDIS_PORT, REDIS_USER } from '../configs';

const redisClient = createClient({
  url: `redis://${REDIS_USER}:${REDIS_PASS}@${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on('ready', () => console.log('Redis connected.'));
redisClient.on('error', (err) => console.error('Redis Client Error: ', err));

export default redisClient;
