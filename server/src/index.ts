import dotenv from 'dotenv';

import { createServer } from 'http';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 8000;
const httpServer = createServer(app);
httpServer.listen(PORT, () => {
  console.log(`Server is starting and running on http://localhost:${PORT}`);
})
