const cart = require("./../models/carts");

async function addToCart(userId, productId, quantity) {
    try {
        let product = await cart.findOne({ userId: userId, productId: productId });
        if (product) {
            await cart.findOneAndUpdate(
                { _id: product._id },
                { quantity: product.quantity + quantity },
                { new: true } // Returns the modified document
            );

        }
        else {
            product = new cart({
                userId: userId,
                productId: productId,
                quantity: Number(quantity)
            });
            await product.save();
        }
    }
    catch (error) {
        console.error('Error adding to cart:', error);
        throw new Error('Could not add item to cart'); // Throwing error for further handling
    }

}

async function removeFromCart(userId, productId) {
    try {
        const removedProduct = await cart.findOneAndDelete({ userId: userId, productId: productId });
        return removedProduct; // Optionally return the removed product for further use
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw new Error('Could not remove item from cart'); // Throwing error for further handling
    }
}

async function getCartItems(userId) {
    try {
        const products = await cart.find({ userId: userId }).populate("productId");
        return products.map((x) => {
            return { quantity: x.quantity, product: x.productId };
        });
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        throw new Error('Could not retrieve cart items'); // Throwing error for further handling
    }

}

module.exports = { getCartItems, addToCart, removeFromCart };