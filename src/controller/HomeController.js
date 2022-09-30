import OrderStorage from '../database/OrdersStorage.js';

export default async function homePage(req, res) {
  const allOrders = await OrderStorage.allOrders();

  res.render('home', { allOrders });
}
