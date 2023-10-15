import express from 'express';

<<<<<<< HEAD
import { env } from './lib/utils/env';
import logger from './lib/utils/logger';
import mainLoader from './loaders';
=======
import mainLoader from './loaders';
import env from './loaders/env';
import logger from './utils/logger';
>>>>>>> parent of 8e2cabd (express backend integration and all other updates)

console.clear();
const spinner = ['|', '/', '-', '\\'];
let i = 0;
const interval = setInterval(() => {
  process.stdout.write(`\r${spinner[i++ % spinner.length]} Initializing...`);
}, 100);

async function initialize() {
  const app = express();
  await mainLoader(app);
  app.listen(env.PORT, () => {
    clearInterval(interval);
    logger.info(`🚀 Server is running on port ${env.PORT}`);
  });
}

void initialize();
