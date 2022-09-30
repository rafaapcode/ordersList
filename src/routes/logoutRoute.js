import Router from 'express';
import Logout from '../controller/LogoutController';

const logoutRoute = new Router();

logoutRoute.get('/', Logout);

export default logoutRoute;
