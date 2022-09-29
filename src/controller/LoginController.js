import DeliveryGuyModel from '../model/DeliveryGuy.js';
import DeliveryStorage from '../database/DeliveryStorage.js';
import Validate from '../service/validate.js';

export function loginPage(req, res) {
  res.render('login');
}

export async function login(req, res) {
  const { name, email, password } = req.body;

  const newDeliveryGuy = await DeliveryGuyModel.create({ name, email, password });

  res.json(newDeliveryGuy);
}

export async function signup(req, res) {
  const validate = new Validate(req.body);
  await validate.validate();

  if (validate.errors.length > 0) {
    req.flash('errors', validate.errors);
    req.session.save(() => res.redirect('back'));
    return;
  }

  await DeliveryStorage.storage(req.body);

  req.flash('success', 'User created successfully.');
  req.session.save(() => res.redirect('back'));
}
