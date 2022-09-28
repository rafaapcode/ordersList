import Router from 'express';
import { login, loginPage, signUp } from '../controllers/LoginController.js';

const loginRoute = new Router();

loginRoute.get('/', loginPage);
loginRoute.post('/login', login);
loginRoute.post('/signup', signUp);

export default loginRoute;
