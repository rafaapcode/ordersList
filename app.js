import express from 'express';
import flash from 'connect-flash';
import session from 'express-session';
import { join } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sessionConfig from './src/config/sessionConfig.js';
import loginRoute from './src/routes/loginRoute.js';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.views();
    this.database();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(flash());
    this.app.use(session(sessionConfig));
    this.app.set('port', 3000);
  }

  routes() {
    this.app.use('/', loginRoute);
  }

  views() {
    this.app.set('views', join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');
  }

  database() {
    mongoose.connect(process.env.DATABASE_URL);
  }
}

export default new App().app;
