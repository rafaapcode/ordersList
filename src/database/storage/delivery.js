import bcryptjs from 'bcryptjs';
import prisma from '../PrismaClient.js';
import Validate from '../service/validate.js';

export default class StorageDelivery {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.delivery = null;
  }

  async storage() {
    const verifyDeliveryGuy = new Validate(this.body, this.errors);

    verifyDeliveryGuy.validate();

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
}
