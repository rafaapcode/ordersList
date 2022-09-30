import OrderModel from '../model/Orders.js';

export default class Order {
  static async storage(body) {
    const createOrder = await OrderModel.create(body);

    return createOrder;
  }

  static async update(id, body) {
    const newOrder = await OrderModel.findOneAndUpdate(id, body, { new: true });

    return newOrder;
  }

  static async delete(id) {
    const deletedOrder = await OrderModel.findOneAndDelete({ _id: id });

    return deletedOrder;
  }

  static async getOrder(id) {
    const order = await OrderModel.findOne({ _id: id });

    return order;
  }
}
