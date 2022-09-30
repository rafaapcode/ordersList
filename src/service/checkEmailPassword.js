import bcryptjs from 'bcryptjs';
import DeliveryStorage from '../database/DeliveryStorage.js';

export default class CheckEmailPassword {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.delivery = null;
  }

  async checkEmailPassword() {
    const { email, password: passwordBody } = this.body;

    const delivery = await DeliveryStorage.getDelivery(email);

    if (!delivery) {
      this.errors.push('Email invalid');
      return;
    }

    if (!bcryptjs.compareSync(passwordBody, delivery.password)) {
      this.errors.push('Password incorrect');
      return;
    }

    this.delivery = delivery;
  }
}
