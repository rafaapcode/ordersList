import Router from 'express';
import { home } from '../controllers/HomeController';

const homeRoute = new Router();

homeRoute.get('/', home);

export default homeRoute;
