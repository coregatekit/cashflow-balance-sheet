import dotenv from 'dotenv';

import { createServer } from 'http';
import app from './app';
import redisClient from './databases/redis';
import mongoClient from './databases/mongo';

dotenv.config();

const PORT = process.env.PORT || 8000;
const httpServer = createServer(app);
httpServer.listen(PORT, () => {
  console.log(`Server is starting and running on http://localhost:${PORT}`);
});

const gracefulShutdown = () => {
  console.info('Get SIGTERM. Graceful shutdown start', new Date().toISOString());
  try {
    httpServer.close(async () => {
      console.log('Closed out remaining connections.');
      redisClient.disconnect();
      (await mongoClient).connection.close();
    });

    setTimeout(async () => {
      console.error('Could not close connections in time, forcefully shutting down');
      redisClient.disconnect();
      (await mongoClient).connection.close();
    }, 10 * 1000);

    console.log('All database disconnected.');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

// listen for TERM signal .e.g kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.c. Ctrl-C
process.on('SIGINT', gracefulShutdown);
