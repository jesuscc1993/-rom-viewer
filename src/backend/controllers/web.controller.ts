import { Express } from 'express';

export const webController = (app: Express) => {
  app.get('/', (_, res) => {
    res.sendFile('/frontend/index.html', { root: './src' });
  });
};
