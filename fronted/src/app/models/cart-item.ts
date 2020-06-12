import { Product } from './products';
import { User } from './users';

export class CartItem {
  constructor(_id: '', productId, userId) {
    this._id = _id;
    this.productId = productId;
    this.userId = userId;
  }
  _id: string;
  productId: string;
  userId: string;
}
