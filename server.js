// const express = require('express');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authMiddleware = require('./middleware/auth');

// dotenv.config();

// const app = express();

// // Connect to database
// connectDB();

// // Middleware
// app.use(express.json({ extended: false }));
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/api/products', authMiddleware);

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// app.use('/api/products', require('./routes/products'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(bodyParser.json()); // This includes bodyParser.json()

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products',authMiddleware, require('./routes/products')); // Apply auth middleware for product routes
// app.use('/api/products',authMiddleware, require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/customer' ,require('./routes/customer'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
