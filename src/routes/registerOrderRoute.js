import Router from 'express';
import {
  registerPage, registerOrder, index, edit, remove,
} from '../controller/RegisterOrderController';
import middleware from '../middlewares/middleware.js';

const registerRoute = new Router();

registerRoute.get('/', middleware.loginRequired, registerPage);
registerRoute.post('/registerorder', middleware.loginRequired, registerOrder);
registerRoute.get('/index/:id', middleware.loginRequired, index);
registerRoute.post('/edit/:id', middleware.loginRequired, edit);
registerRoute.get('/delete/:id', middleware.loginRequired, remove);

export default registerRoute;
