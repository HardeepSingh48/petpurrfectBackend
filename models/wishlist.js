const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: Array(String)
});

module.exports = mongoose.model('wishlists', wishlistSchema);
