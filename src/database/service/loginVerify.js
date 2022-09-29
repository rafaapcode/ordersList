import bcryptjs from 'bcryptjs';
import prisma from '../PrismaClient';

export default class LoginVerify {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.delivery = null;
  }

  async login() {
    this.validator();
    if (this.errors.length > 0) return;

    await this.verifyEmail();
    if (this.errors.length > 0) return;

    this.verifyPassword();
    if (this.errors.length > 0) return;
  }

  async verifyEmail() {
    this.delivery = await prisma.delivery.findMany({
      where: {
        email: this.body.email,
      },
    });

    if (!this.delivery) {
      this.errors.push('User not exists.');
    }
  }

  verifyPassword() {
    if (!bcryptjs.compareSync(this.body.password, this.delivery.password)) {
      this.errors.push('Password invalid.');
      this.delivery = null;
    }
  }

  validator() {
    this.clean();

    if (!this.email(this.body.email)) this.errors.push('Email invalid');
    if (this.body.name.length < 5) this.errors.push('Name must be at least 5 characters.');
    if (this.body.password.length < 7) this.errors.push('Password must be at least 7 characters.');
  }

  email(email) {
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
      email: this.body.email,
      password: this.body.password,
    };
  }
}
