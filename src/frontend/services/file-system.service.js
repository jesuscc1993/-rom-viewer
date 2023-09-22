import { httpService } from './http.service';

const getServerUrl = () => {
  return 'http://localhost:3140';
};

const execute = (command) => {
  return httpService.post(`${getServerUrl()}/execute`, { command });
};
const readFile = (path) => {
  return httpService.post(`${getServerUrl()}/read-file`, { path });
};
const openFile = (path) => {
  return httpService.post(`${getServerUrl()}/open-file`, { path });
};

export const fileSystemService = { execute, readFile, openFile };
