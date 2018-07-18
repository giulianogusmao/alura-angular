export class Helper {

  constructor() {
    throw new Error('Class Helper não deve ser instanciada!');
  }

  static get api() {
    return 'http://localhost:3000';
  }
}
