export class WishList {
  constructor(_id: '', productId, userId) {
    this._id = _id;
    this.productId = productId;
    this.userId = userId;
  }
  _id: string;
  productId: string;
  userId: string;
}
