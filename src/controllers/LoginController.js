// import prisma from '../database/PrismaClient.js';

export function loginPage(req, res) {
  res.render('login');
}

export function login(req, res) {
  res.send('signin');
}

export function signUp(req, res) {
  res.send('signup');
}
