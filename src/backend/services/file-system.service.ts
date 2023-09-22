import { exec } from 'child_process';

import { getCommandLine } from '../domain/system.domain';

const openFile = (path: string) => {
  exec(getCommandLine().replace('$1', path));
};

export const fileSystemService = {
  openFile,
};
