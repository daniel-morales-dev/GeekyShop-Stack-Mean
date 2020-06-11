import { Product } from './products';
import { User } from './users';

export class CartItem {
  constructor(_id: '', product: Product, user: User) {
    this._id = _id;
    this.productId = product._id;
    this.name = product.name;
    this.price = product.price;
    this.userId = user._id;
  }
  _id: string;
  productId: string;
  name: string;
  price: number;
  userId: string;
}
