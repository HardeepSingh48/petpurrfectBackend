const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
const Category = require('../models/Category');
const getProduct = require('../handler/product-handler');
const { getCartItems,addToCart,removeFromCart } = require('../handler/shopping-cart-handler');
const ObjectId = require('mongoose').Types.ObjectId; 

// @route    POST /api/products
// @desc     Create a product
// @access   Public
router.post('/', authMiddleware, async (req, res) => {
    const { productSku, productName, productPrice, productShortName, productDescription, deliveryTimeSpan, productImageUrl } = req.body;

    try {

        const userId = req.user.id;

        const newProduct = new Product({
            productSku,
            productName,
            productPrice,
            productShortName,
            productDescription,
            deliveryTimeSpan,
            productImageUrl,
            userId: userId
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error err');
    }
});

// @route    GET /api/products
// @desc     Get all products
// @access   Public
router.get('/',authMiddleware, async (req, res) => {
    try {
        // console.log('Fetching products for user:', req.user.id);//DISPLAY
        const products = await Product.find();
        // console.log('Products:', products); // DISPLAY
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET /api/products/:id
// @desc     Get a product by ID
// @access   Public
router.get('/product/:id', async (req, res) => {
    const { id } = req.params;

    // Validate if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Invalid product ID' });
    }

    try {
        // Fetch the product from the database by its ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route    PUT /api/products/:id
// @desc     Update a product by ID
// @access   Public
router.put('/:id', async (req, res) => {
    const { productSku, productName, productPrice, productShortName, productDescription, deliveryTimeSpan, productImageUrl } = req.body;

    const productFields = { productSku, productName, productPrice, productShortName, productDescription, deliveryTimeSpan, productImageUrl };

    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: productFields },
            { new: true }
        );

        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route    DELETE /api/products/:id
// @desc     Delete a product by ID
// @access   Public
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server error');
    }
});

// router.get("/customer/carts", async(req,res) => {
//     console.log(req.user);
//     const userId = req.user.id;
//     const items = await getCartItems(userId);
//     res.send(items);
// });

// router.post("/customer/carts/:id", async(req,res) => {
//     console.log(req.user);
//     const userId = req.user.id;
//     const productId = req.params.id;
//     const quantity = req.body.quantity;
//     const items = await addToCart(userId,productId,quantity);
//     res.send(items);
// });

// router.delete("/customer/carts/:id", async(req,res) => {
//     console.log(req.user);
//     const userId = req.user.id;
//     const productId = req.params.id;
//     const quantity = req.body.quantity;
//     const items = await removeFromCart(userId,productId);
//     res.send(items);
// });


module.exports = router;
