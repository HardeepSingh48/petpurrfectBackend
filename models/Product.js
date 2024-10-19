const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
  productSku: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productShortName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  deliveryTimeSpan: {
    type: String,
    required: true 
  },
  productImageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId, // Alternatively, if it's an object reference, it can be: Schema.Types.ObjectId
    ref: 'Category',
    required: true
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  },
  isFreeShipping: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Boolean,
    default: true
  },
  rating: {
    type: [Number], // Array of numbers, representing 5-star ratings
    default: [0, 0, 0, 0, 0]
  },
  reviews: {
    type: Number,
    default: 0
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
