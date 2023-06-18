import 'reflect-metadata';
import { logger } from '@core/logger';
import { config } from '@config/app';
import { Database } from '@core/database';

import app from './app';

const port = config.port;

const startServer = async (): Promise<void> => {
  await Database.getConnection();
  // await Database.getPostgresConnection();
  app
    .listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    })
    .on('error', (err) => {
      logger.error(err);
    });
};

startServer();
