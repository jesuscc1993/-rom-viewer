import { Express } from 'express';

import { invalidRequestBodyError } from '../errors/invalid-request-body.error';
import { fileSystemService } from '../services/file-system.service';
import { FileRequest } from '../types/path.types';

export const pathController = (app: Express) => {
  app.post('/execute', (req: FileRequest, res) => {
    const command = req.body?.path;
    if (!command) throw invalidRequestBodyError;

    res.send(fileSystemService.execute(command));
  });

  app.post('/open-file', (req: FileRequest, res) => {
    const path = req.body?.path;
    if (!path) throw invalidRequestBodyError;

    res.send(fileSystemService.openFile(path));
  });

  app.post('/read-file', (req: FileRequest, res) => {
    const path = req.body?.path;
    if (!path) throw invalidRequestBodyError;

    res.sendFile(path);
  });
};
