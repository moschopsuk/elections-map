const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  mongoose.connect('mongodb://localhost:32768/elections', { server: { socketOptions: { keepAlive: 1 } } });
  console.log(`http://127.0.0.1:${port}`);
});
