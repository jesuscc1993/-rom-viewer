import { Express } from 'express';

import { invalidRequestBodyError } from '../errors/invalid-request-body.error';
import { fileSystemService } from '../services/file-system.service';
import { FileRequest } from '../types/path.types';

export const pathController = (app: Express) => {
  app.post('/open-file', (req: FileRequest, res) => {
    const path = req.body?.path;
    if (!path) throw invalidRequestBodyError;

    fileSystemService.openFile(path);

    res.send(undefined);
  });
};
