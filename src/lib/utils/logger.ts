import 'winston-mongodb';

import winston from 'winston';

import { env } from './env';
const mongoTransport = new winston.transports.MongoDB({
  // db: 'mongodb+srv://cartibuy:emG8aF7Cr6IVE3tv@cartibuy.uw8m1ik.mongodb.net/cartibuy_db?retryWrites=true&w=majority',
  db: env.DATABASE_URL,
  collection: 'server_logs',
  level: 'error',
  label: 'core_server',
  options: {
    useUnifiedTopology: true,
  },
});

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss',
        }),
        winston.format.simple(),
        winston.format.printf((info: any) => {
          return `[${info.timestamp as string}] ${info.level as string}: ${
            info.message as string
          } ${info.metaData ? JSON.stringify(info.meta) : ''}`;
        })
      ),
    }),
    mongoTransport,
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.metadata({
      fillExcept: ['message', 'level', 'timestamp', 'label'],
    })
  ),
});

export default logger;
