import express from 'express';

import { pathController } from './controllers/path.controller';
import { webController } from './controllers/web.controller';

const port = 3140;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

pathController(app);
webController(app);

app.listen(port, () => {
  console.info(`Server listening at http://localhost:${port}.`);
});
