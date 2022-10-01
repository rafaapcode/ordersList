import OrderStorage from '../database/OrdersStorage.js';

export function registerPage(req, res) {
  res.render('registerPage', {
    order: {},
  });
}

export async function registerOrder(req, res) {
  try {
    const verifyFields = Object.values(req.body).some(value => value === '');
    if (verifyFields) {
      req.flash('errors', 'Fill all the fields.');
      req.session.save(() => res.redirect('back'));
      return;
    }

    const { _id } = await OrderStorage.storage(req.body);

    req.flash('success', 'Order has been created.');
    req.session.save(() => res.redirect(`/register/index/${_id}`));
  } catch (error) {
    res.render('404');
  }
}

export async function index(req, res) {
  if (!req.params.id) return res.render('404');

  const order = await OrderStorage.getOrder(req.params.id);

  if (!order) return res.render('404');

  return res.render('registerPage', { order });
}

export async function edit(req, res) {
  try {
    const verifyFields = Object.values(req.body).some(value => value === '');
    if (verifyFields) {
      req.flash('errors', 'Fill all the fields.');
      req.session.save(() => res.redirect('back'));
      return;
    }

    if (!req.params.id) res.render('404');

    await OrderStorage.update(req.params.id, req.body);

    req.flash('success', 'Successfully edited order.');
    req.session.save(() => res.redirect(`/register/index/${req.params.id}`));
  } catch (e) {
    res.render('404');
  }
}

export async function remove(req, res) {
  try {
    await OrderStorage.delete(req.params.id);

    req.flash('success', 'Order deleted successfully.');
    req.session.save(() => res.redirect('back'));
  } catch (e) {
    res.render('404');
  }
}
