'use strict';

//============
// Application
//============

const express = require('express');
const app = express();
const pg = require('pg');
const methodOverride = require('method-override');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(methodOverride((req, res) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//=========
// Database
//=========

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.log(err));

//=======
// Routes
//=======

app.get('/', renderMain);

//=====
// Main
//=====

function renderMain (req, res) {
  res.render('pages/main.ejs');
}

//=========
// Listener
//=========

app.listen(PORT, () => console.log(`App is running on Port: ${PORT}`));
