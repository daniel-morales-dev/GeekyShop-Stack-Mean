import { Product } from './products';

export class CartItem {
  constructor(_id: '', product: Product) {
    this._id = _id;
    this.productId = product._id;
    this.name = product.name;
    this.price = product.price;
  }
  _id: string;
  productId: string;
  name: string;
  price: number;
}
