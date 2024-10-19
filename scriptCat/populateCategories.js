const mongoose = require('mongoose');
const Category = require('../models/Category'); // Adjust the path as needed

const categories = [
  { categoryId: 55, categoryName: 'Fruits & Vegetables', parentCategoryId: 0, userId: null },
  { categoryId: 56, categoryName: 'Foodgrains, Oil & Masala', parentCategoryId: 0, userId: null },
  { categoryId: 57, categoryName: 'Bakery, Cakes & Dairy', parentCategoryId: 0, userId: null },
  { categoryId: 58, categoryName: 'Beverages', parentCategoryId: 0, userId: null },
  { categoryId: 59, categoryName: 'Snacks & Branded Foods', parentCategoryId: 0, userId: null },
  { categoryId: 61, categoryName: 'Cuts & Sprouts', parentCategoryId: 55, userId: null },
  { categoryId: 62, categoryName: 'Dals & Pulses', parentCategoryId: 55, userId: null },
  { categoryId: 63, categoryName: 'Exotic Fruits & Veggies', parentCategoryId: 55, userId: null },
  { categoryId: 64, categoryName: 'Flower Bouquets, Bunches', parentCategoryId: 55, userId: null },
  { categoryId: 65, categoryName: 'Atta, Flours & Sooji', parentCategoryId: 56, userId: null },
  { categoryId: 66, categoryName: 'Dry Fruits', parentCategoryId: 56, userId: null },
  { categoryId: 67, categoryName: 'Edible Oils & Ghee', parentCategoryId: 56, userId: null },
  { categoryId: 68, categoryName: 'Bakery Snacks', parentCategoryId: 57, userId: null },
  { categoryId: 69, categoryName: 'Cakes & Pastries', parentCategoryId: 57, userId: null },
  { categoryId: 75, categoryName: 'Snacks', parentCategoryId: 0, userId: null },
  { categoryId: 76, categoryName: 'soft drinks', parentCategoryId: 0, userId: null },
  { categoryId: 77, categoryName: 'BBQ', parentCategoryId: 0, userId: null },
  { categoryId: 81, categoryName: 'Cat E', parentCategoryId: 0, userId: null },
  { categoryId: 82, categoryName: 'string', parentCategoryId: 0, userId: null },
  { categoryId: 83, categoryName: 'Fragrances', parentCategoryId: 0, userId: null },
  { categoryId: 84, categoryName: 'Fragrances & Scents', parentCategoryId: 0, userId: null },
  { categoryId: 85, categoryName: 'Scents', parentCategoryId: 0, userId: null },
  { categoryId: 86, categoryName: 'FragrancesNew', parentCategoryId: 0, userId: null },
  { categoryId: 88, categoryName: 'Oil & Masala', parentCategoryId: 0, userId: null },
  { categoryId: 89, categoryName: 'T-shirts', parentCategoryId: 0, userId: null },
  { categoryId: 90, categoryName: 'eyob', parentCategoryId: 0, userId: null },
  { categoryId: 93, categoryName: 'Home and kitchen', parentCategoryId: 0, userId: null },
  { categoryId: 95, categoryName: 'Mobile', parentCategoryId: 0, userId: 123 },
  { categoryId: 101, categoryName: 'Toys', parentCategoryId: 0, userId: null }
];

async function populateCategories() {
  try {
    await mongoose.connect('mongodb://localhost:27017/USERS', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Category.insertMany(categories);
    console.log('Categories added successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

populateCategories();
