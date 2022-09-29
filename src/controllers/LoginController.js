import StorageDelivery from '../database/storage/delivery';
import LoginVerify from '../database/service/loginVerify';

export function loginPage(req, res) {
  res.render('login');
}

export async function login(req, res) {
  console.log(req.body);
  try {
    const loginDelivery = new LoginVerify(req.body);
    await loginDelivery.login();

    if (loginDelivery.errors.length > 0) {
      req.flash('errors', loginDelivery.errors);
      req.session.save(() => {
        res.redirect('back');
      });
    }

    req.session.deliveryGuy = loginDelivery.delivery;
    req.session.save(() => res.redirect('/home'));
  } catch (err) {
    console.log(err);
    res.render('404');
  }
}

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const newDeliveryGuy = new StorageDelivery({ name, email, password });
    await newDeliveryGuy.storage();

    if (newDeliveryGuy.errors.length > 0) {
      req.flash('errors', newDeliveryGuy.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'User created successfully.');
    req.session.save(() => res.redirect('back'));
  } catch (e) {
    console.log(e);
    res.render('404');
  }
}
