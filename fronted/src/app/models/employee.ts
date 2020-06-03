export class Employee {
  constructor(_id = '', name = '', position = '', officine = '', salary = 0) {
    this._id = _id;
    this.name = name;
    this.position = position;
    this.officine = officine;
    this.salary = salary;
  }

  _id: string;
  name: string;
  position: string;
  officine: string;
  salary: number;
}
