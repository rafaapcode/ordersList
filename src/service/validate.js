import DeliveryGuy from '../database/DeliveryStorage';

export default class Validate {
  constructor(body) {
    this.body = body;
    this.errors = [];
  }

  async validate() {
    this.#cleanUp();
    if (!this.#isEmail(this.body.email)) this.errors.push('Email invalid');

    if (this.body.password.length < 5) this.errors.push('Password must be between 5 and 50 characters');

    if (this.body.name < 5) this.errors.push('Name must be at least 5 characters.');

    const deliveryGuy = await DeliveryGuy.getDelivery(this.body.email);

    if (deliveryGuy) this.errors.push('User already exists.');
  }

  #isEmail(email) {
    const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return validateEmail.test(email);
  }

  #cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      name: this.body.name,
      password: this.body.password,
    };
  }
}
