export class Product {
  constructor(
    _id = '',
    name = '',
    description = '',
    price = 0,
    imagePath = ''
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imagePath = imagePath;
  }

  _id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
}
