const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const api = require('./api');

const port = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, 'public');

const app = express();
app.use(bodyParser.json());
app.use('/api', api.router);
app.use(history());
app.use('/', express.static(publicFolder));

app.listen(port, () => console.log(`Listening on port ${port}`));
