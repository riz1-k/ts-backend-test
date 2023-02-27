import express from 'express';

import mainLoader from './loaders';
import env from './loaders/env';
import logger from './utils/logger';

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
