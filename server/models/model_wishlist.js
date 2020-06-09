const mongoose = require('mongoose');
const { Schema } = mongoose;
const wishListSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('WishList', wishListSchema);
