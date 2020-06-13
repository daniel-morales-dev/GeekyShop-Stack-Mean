const mongoose = require('mongoose');
const { Schema } = mongoose;
const wishListSchema = new Schema(
  {
    productId: {
      type: Array,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('WishList', wishListSchema);
