const { name } = require("body-parser");
const Product = require("../models/Product");

async function getProduct(id) {
    let product = await Product.findById(id);
    return product.toObject();

}

async function getProductForListing(searchTerm, categoryId, page, pageSize, sortBy, sortOrder) {
    if (!sortBy) {
        sortBy = 'price'
    }
    if (!sortOrder) {
        sortOrder = -1
    }
    let queryFilter = {};
    if (searchTerm) {
        name: searchTerm
    }
    if (categoryId) {
        categoryId: categoryId
    }
    const product = Product.find(queryFilter)
        .sort({
            sortBy: sortOrder,
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    return (await product).map(x => x.toObject()); ///check this again
}

module.exports = {
    getProductForListing

}