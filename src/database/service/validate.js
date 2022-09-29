export default class Validate {
  constructor(body, errors) {
    this.body = body;
    this.errors = errors;
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
