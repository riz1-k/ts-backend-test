import bodyparser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
import { type Application, type Request, type Response } from 'express';
import helment from 'helmet';
import morgan from 'morgan';

// import { apiRouter } from '../apis/routes';
import { env } from '../lib/utils/env';
import logger from '../lib/utils/logger';

const whiteListedDomains: string[] = ['http://localhost:3005'];

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
    origin(origin, callback) {
      if (!origin || whiteListedDomains.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };

  app.use(cookieParser(env.COOKIE_SECRET));

  app.use(cors(corsOptions));
  app.use(helment());
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(
    morgan('dev', { stream: { write: (message) => logger.info(message) } })
  );
  // app.use('/api', apiRouter);

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
