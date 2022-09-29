import Router from 'express';
import { loginPage, login } from '../controller/LoginController';

const loginRoute = new Router();

loginRoute.get('/', loginPage);
loginRoute.post('/login', login);

export default loginRoute;
