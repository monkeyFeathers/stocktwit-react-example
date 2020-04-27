const express = require('express');
// const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8080;
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
