import Router from 'express';
import {
  registerPage, registerOrder, index, edit, remove,
} from '../controller/RegisterOrderController';

const registerRoute = new Router();

registerRoute.get('/', registerPage);
registerRoute.post('/registerorder', registerOrder);
registerRoute.get('/index/:id', index);
registerRoute.post('/edit/:id', edit);
registerRoute.get('/delete/:id', remove);

export default registerRoute;
