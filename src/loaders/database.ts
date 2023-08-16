import { connect, set } from 'mongoose';

import { env } from '../lib/utils/env';
import logger from '../lib/utils/logger';

const connectToDatabase = async () => {
  try {
    set('strictQuery', true);
    if (env.NODE_ENV === 'development') {
      set('debug', true);
    }
    await connect(env.DATABASE_URL);
    console.clear();
    logger.info('🚀 Database connected');
  } catch (err) {
    console.log('❌ Database connection failed');
    process.exit(1);
  }
};

export default connectToDatabase;
