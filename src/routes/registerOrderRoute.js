import Router from 'express';
import { registerPage, registerOrder, index } from '../controller/RegisterOrderController';

const registerRoute = new Router();

registerRoute.get('/', registerPage);
registerRoute.post('/registerorder', registerOrder);
registerRoute.get('/index/:id', index);

export default registerRoute;
