import Router from 'express';
import { loginPage, login, signup } from '../controller/LoginController';

const loginRoute = new Router();

loginRoute.get('/', loginPage);
loginRoute.post('/login', login);
loginRoute.post('/signup', signup);

export default loginRoute;
