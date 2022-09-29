import bcryptjs from 'bcryptjs';
import DeliveryGuyModel from '../model/DeliveryGuy.js';

export default class DeliveryGuy {
  static async storage(body) {
    const salt = bcryptjs.genSaltSync();
    body.password = await bcryptjs.hashSync(body.password, salt);
    const createDelivery = await DeliveryGuyModel.create(body);

    return createDelivery;
  }

  static async update(id, body) {
    const newDelivery = await DeliveryGuyModel.findOneAndUpdate(id, body, { new: true });

    return newDelivery;
  }

  static async delete(id) {
    const deletedDelivery = await DeliveryGuyModel.findOneAndDelete({ _id: id });

    return deletedDelivery;
  }

  static async getDelivery(email) {
    const delivery = await DeliveryGuyModel.findOne({ email });

    return delivery;
  }
}
