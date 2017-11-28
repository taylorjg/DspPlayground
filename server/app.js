import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import apiRouter from './api';

const port = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, 'public');

const app = express();
app.use(bodyParser.json());
app.use('/api', apiRouter);
app.use(history());
app.use('/', express.static(publicFolder));

app.listen(port, () => console.log(`Listening on port ${port}`));
