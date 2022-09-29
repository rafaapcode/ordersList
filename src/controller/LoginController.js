import DeliveryGuyModel from '../model/DeliveryGuy.js';

export function loginPage(req, res) {
  res.render('login');
}

export async function login(req, res) {
  const { name, email, password } = req.body;

  const newDeliveryGuy = await DeliveryGuyModel.create({ name, email, password });

  res.json(newDeliveryGuy);
}

export async function signup(req, res) {
  res.json(req.body);
}
