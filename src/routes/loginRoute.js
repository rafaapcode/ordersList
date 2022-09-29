import Router from 'express';
import { loginPage } from '../controller/LoginController';

const loginRoute = new Router();

loginRoute.get('/', loginPage);

export default loginRoute;
