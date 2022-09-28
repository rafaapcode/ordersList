import Router from 'express';
import { homePage } from '../controllers/HomeController.js';

const homeRoute = new Router();

homeRoute.get('/', homePage);

export default homeRoute;
