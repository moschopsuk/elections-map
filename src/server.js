const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.Promise = Promise;

const app = express();
const server = http.Server(app);
const io = socket(server);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ cookie: { maxAge: 60000 }, secret: 'la1tv', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.pretty = true;

app.use('/', routes(io));

server.listen(port, () => {
  mongoose.connect('mongodb://localhost:32770/elections', { server: { socketOptions: { keepAlive: 1 } } });
  console.log(`Map: http://127.0.0.1:${port}/map`);
  console.log(`Admin: http://127.0.0.1:${port}/admin`);
  console.log(`iPad: http://127.0.0.1:${port}/ipad`);
});

io.on('connection', () => {

});
