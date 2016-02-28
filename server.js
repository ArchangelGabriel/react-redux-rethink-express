import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import http from 'http';
import socketIO from 'socket.io';
import config from 'config';

import passport from './server/api/auth';
import * as api from './server/api/http';
import * as eventService from './server/api/service/event';
import * as uni from './server/app.js';

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;

var io = socketIO(httpServer);

/**
 * Configure Server
 */
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');
app.use(require('serve-static')(path.join(__dirname, config.get('buildDirectory'))));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(config.get('session')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session())

/**
 * Auth Endpoints
 */
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), ({ res }) => res.redirect('/'));

/**
 * API Endpoints
 */
app.get('/api/0/events', api.getEvents);
app.post('/api/0/events', api.addEvent);
app.post('/api/0/events/:id', api.editEvent);
app.delete('/api/0/events/:id', api.deleteEvent);

app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'images', 'favicon.ico')));

/**
 * Universal Application endpoint
 */
app.get('*', uni.handleRender);

eventService.liveUpdates(io);
httpServer.listen(port);
