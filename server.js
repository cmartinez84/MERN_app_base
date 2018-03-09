const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();

const port = process.env.PORT || 8080;

//createa a .env file at the root locally

require('dotenv').config()

mongoose.connect(config.database);

mongoose.connection.on('connected', ()=>{
  console.log('connected to db' + config.database)
})

mongoose.connection.on('error', err=>{
  console.log(err);
})

// app.use(passport.intialize());
// app.use(passport.session());
//
// require('./config/passport')(passport);

app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// app.use('/users', users);

app.get('/', (req, res)=>{
  res.send('invalid')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, ()=>{
  console.log('server started');
})
