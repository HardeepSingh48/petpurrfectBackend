const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryId: { type: Number, required: true },
    categoryName: { type: String, required: true },
    parentCategoryId: { type: Number, default: 0 },
    userId: { type: Number, default: null }
});

module.exports = mongoose.model('Category', categorySchema);
