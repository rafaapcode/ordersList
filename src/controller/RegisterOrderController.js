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

  console.log(order);

  return res.render('registerPage', { order });
}
