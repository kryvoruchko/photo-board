const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const board = require('./server/routes/board');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const mongoUrl =
  'mongodb://b4311a79bf05fce3321c9b685dae6a23:dev123@11a.mongo.evennode.com:27018/b4311a79bf05fce3321c9b685dae6a23';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.get('/', express.static('/uploads/images'));
app.use('/api/boards', board);

app.get('/uploads/images/:file', (req, res) => {
  const file = req.params.file;
  const image = fs.readFileSync('./uploads/images/' + file);
  res.end(image, 'binary');
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log('Server is up and running on port numner ' + port);
});