const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const server = http.Server(app);
const io = socket(server);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
  // mongoose.connect('mongodb://localhost:32768/elections', { server: { socketOptions: { keepAlive: 1 } } });
  console.log(`http://127.0.0.1:${port}`);
});

io.on('connection', () => {

});
