const path = require('path');
const express = require('express');
const history = require('connect-history-api-fallback');

const port = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, 'public');

const app = express();
app.use(history());
app.use('/', express.static(publicFolder));

app.listen(port, () => console.log(`Listening on port ${port}`));
