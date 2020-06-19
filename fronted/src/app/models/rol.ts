export class Rol {
  constructor(_id = '', nombreRol = '') {
    this._id = _id;
    this.nombreRol = nombreRol;
  }

  _id: string;
  nombreRol: string;
}
