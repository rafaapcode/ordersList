import Router from 'express';
import homePage from '../controller/HomeController';
import middleware from '../middlewares/middleware.js';

const homeRoute = new Router();

homeRoute.get('/', middleware.loginRequired, homePage);

export default homeRoute;
