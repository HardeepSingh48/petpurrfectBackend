const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getCartItems,addToCart,removeFromCart } = require('../handler/shopping-cart-handler');
const authenticateToken = require('../middleware/auth');


router.use(authenticateToken);

router.get("/carts", async(req,res) => {
    // console.log(req.user);
    const userId = req.user.id;
    const items = await getCartItems(userId);
    res.send(items);
});

router.post("/carts/:id", async(req,res) => {
    // console.log(req.user);
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const items = await addToCart(userId,productId,quantity);
    res.send(items);
});

router.delete("/carts/:id", async(req,res) => {
    // console.log(req.user);
    const userId = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const items = await removeFromCart(userId,productId);
    res.send(items);
});


router.get("/products", async(req,res) => {
    console.log(req.user);
    const userId = req.user.id;
    const items = await getCartItems(userId);
    res.send(items);
});

module.exports = router;
