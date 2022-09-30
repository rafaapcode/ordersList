import DeliveryStorage from '../database/DeliveryStorage.js';
import Validate from '../service/validate.js';
import CheckEmailPassword from '../service/checkEmailPassword.js';

export function loginPage(req, res) {
  res.render('login');
}

export async function login(req, res) {
  const validate = new Validate(req.body);
  const checkEmailPassword = new CheckEmailPassword(req.body);
  await validate.validate();

  if (validate.errors.length > 0) {
    req.flash('errors', validate.errors);
    req.session.save(() => res.redirect('back'));
    return;
  }

  await checkEmailPassword.checkEmailPassword();

  if (checkEmailPassword.errors.length > 0) {
    req.flash('errors', checkEmailPassword.errors);
    req.session.save(() => res.redirect('back'));
    return;
  }

  req.session.deliveryguy = checkEmailPassword.delivery;
  req.session.save(() => res.redirect('/home'));
}

// export function logout(req, res) {

// }

export async function signup(req, res) {
  try {
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
  } catch (e) {
    console.log(e);
    res.render('404');
  }
}
