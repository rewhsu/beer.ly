/* eslint no-console: 0 */
const express = require('express');
const https = require('https');
const mongoose = require('mongoose');
const app = express();

const ssl = require('./middleware/ssl.js');
const config = require('./config/config');
const api = require('./api/api');
const auth = require('./auth/auth');
const oauth2 = require('./api/auth/authRoutes');
var session = require('express-session')

// Connect to database
mongoose.connect(config.database.local);

// Middleware
require('./middleware/middleware')(app);

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

// API Routing
app.use('/api', api);

// Authentication
app.use('/auth', auth);

app.use('/oauth2', oauth2);

require('./middleware/webpack')(app, express);

https.createServer(ssl, app).listen(config.port);

console.info('==> 🍺  flowing on %ss. Open up https://localhost:%s/ in your browser.', config.port, config.port);
