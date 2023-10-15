import { type Application } from 'express';

import connectToDatabase from './database';
import { verifyEnv } from './env';
import expressLoader from './express';

const mainLoader = async (app: Application) => {
  verifyEnv();
  await connectToDatabase();
  expressLoader(app);
};

export default mainLoader;
