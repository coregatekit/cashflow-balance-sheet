import dotenv from 'dotenv';

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';

const MONGO_USER = process.env.MONGO_USER || 'antman';
const MONGO_PASS = process.env.MONGO_PASS || 'sup3r_secret';
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB = process.env.MONGO_DB || 'cashflow';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_USER = process.env.REDIS_USER || 'default';
const REDIS_PASS = process.env.REDIS_PASS || 'f*cking_s3cure_redis';

const CACHE_TIME = 3600; // 1 hr in seconds

export {
  ENV,
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASS,
  CACHE_TIME,
};
