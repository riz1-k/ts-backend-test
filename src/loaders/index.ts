import { type Application } from 'express';

import connectToDatabase from './database';
import expressLoader from './express';

const mainLoader = async (app: Application) => {
  await connectToDatabase();
  expressLoader(app);
};

export default mainLoader;
