import bodyparser from 'body-parser';
import cors from 'cors';
import { CorsOptions } from 'cors';
import helment from 'helmet';
import morgan from 'morgan';
import { Application, Request, Response } from 'express';
import routes from '../apis/routes';

import logger from '../utils/logger';

const expressLoader = (app: Application) => {
  process.on('uncaughtException', (ex) => {
    logger.emerg(ex.message, {
      stack: ex.stack,
    });
  });

  process.on('unhandledRejection', (ex: any) => {
    logger.emerg(ex.message, {
      stack: ex.stack,
    });
  });

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
  app.use(helment());
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(
    morgan('dev', { stream: { write: (message) => logger.info(message) } })
  );
  app.use('/api', routes);

  app.get('/', (_req, res) =>
    res
      .status(200)
      .json({
        resultMessage: 'Project is successfully working...',
        resultCode: '00004',
      })
      .end()
  );

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Content-Security-Policy-Report-Only', 'default-src: https:');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT POST PATCH DELETE GET');
      return res.status(200).json({});
    }
    next();
  });

  app.use((_req, _res, next) => {
    const error = new Error('Endpoint could not find!') as any;
    error.status = 404;
    next(error);
  });

  app.use((error: any, _: Request, res: Response) => {
    res.status(error.status || 500);
    logger.crit(error.message);
    return res.json({
      resultMessage: error.message,
      resultCode: '00008',
    });
  });
};

export default expressLoader;
