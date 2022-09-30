import Router from 'express';
import { homePage } from '../controller/HomeController';

const homeRoute = new Router();

homeRoute.get('/', homePage);

export default homeRoute;
