// routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
// const auth = require('../middleware/auth');

// router.use(auth);

// @route    GET /api/categories
// @desc     Get all categories
// @access   Public
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
