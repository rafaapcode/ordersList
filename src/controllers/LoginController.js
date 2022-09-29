import StorageDelivery from '../database/storage/delivery';

export function loginPage(req, res) {
  res.render('login');
}

export function login(req, res) {
  res.send('signin');
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
