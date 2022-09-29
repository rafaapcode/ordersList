import express from 'express';
import { join } from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import loginRoute from './src/routes/LoginRoute.js';
import sessionConfig from './src/config/sessionConfig.js';
import { middleware } from './src/middlewares/middleware.js';
import homeRoute from './src/routes/homeRoute.js';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.views();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(flash());
    this.app.use(session(sessionConfig));
    this.app.use(middleware);
  }

  routes() {
    this.app.use('/', loginRoute);
    this.app.use('/home', homeRoute);
  }

  views() {
    this.app.set('views', join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');
  }
}

export default new App().app;
