import Router from 'express';
import { registerPage } from '../controller/RegisterOrderController';

const registerRoute = new Router();

registerRoute.get('/', registerPage);

export default registerRoute;
