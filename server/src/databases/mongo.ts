import mongoose from 'mongoose';
import {
  MONGO_DB,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASS,
} from '../configs';

const mongoClient = mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, {
  user: MONGO_USER,
  pass: MONGO_PASS,
  dbName: MONGO_DB,
});

export default mongoClient;
