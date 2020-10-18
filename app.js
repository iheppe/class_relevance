'use strict';

const express = require('express');
const app = express();

const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs
  .readFileSync(path.join('./public', 'index.js'))
  .toString();

const window = domino.createWindow(template);
global['window'] = window;

const serviceAccount = require("./class-relevance-firebase-adminsdk-kb8as-bbed54a75a.json");

const admin = require("firebase-admin");

const INVALID_PARAM_ERROR = 400;
const SERVER_ERROR = 500;
const SERVER_ERROR_MSG = {'error': 'Something went wrong on the server,' +
'try again later.'};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://class-relevance.firebaseio.com"
});



