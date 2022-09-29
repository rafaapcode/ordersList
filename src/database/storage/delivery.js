import bcryptjs from 'bcryptjs';
import prisma from '../PrismaClient.js';

export default class StorageDelivery {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.delivery = null;
  }

  async storage() {
    this.validate();
    if (this.errors.length > 0) return;

    await this.deliveryExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = await bcryptjs.hashSync(this.body.password, salt);
    const newDelivery = await prisma.delivery.create({
      data: {
        ...this.body,
      },
    });

    this.delivery = newDelivery;
  }

  async deliveryExists() {
    const delivery = await prisma.delivery.findUnique({ where: { email: this.body.email } });

    if (delivery) this.errors.push('User already exists.');
  }

  validate() {
    this.clean();

    if (!this.verifyEmail(this.body.email)) this.errors.push('Email invalid');
    if (this.body.name.length < 5) this.errors.push('Name must be at least 5 characters.');
    if (this.body.password.length < 7) this.errors.push('Password must be at least 7 characters.');
  }

  verifyEmail(email) {
    const emailVerify = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailVerify.test(email);
  }

  clean() {
    for (let values of Object.values(this.body)) {
      if (typeof values !== 'string') {
        values = '';
      }
    }

    this.body = {
      name: this.body.name,
      email: this.body.email,
      password: this.body.password,
    };
  }
}
