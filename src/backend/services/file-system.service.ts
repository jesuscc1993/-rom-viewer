import { exec } from 'child_process';
import fse from 'fs-extra';

import { getCommandLine } from '../domain/system.domain';

const execute = (command: string) => {
  return exec(command);
};
const openFile = (path: string) => {
  return exec(getCommandLine().replace('$1', path));
};
const readFile = (path: string) => {
  return fse.readFileSync(path, 'utf8');
};

export const fileSystemService = {
  execute,
  openFile,
  readFile,
};
