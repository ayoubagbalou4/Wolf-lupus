const express = require('express');
const app = express();
app.use(express.json());

const PORT = 4000;

const cors = require('cors');
app.use(cors({
    origin: ["http://localhost:3000", "https://perfum-dun.vercel.app", "https://perfum-6j3u.vercel.app"],
    credentials: true
}));


const dotenv = require('dotenv');
dotenv.config()

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASEURL).then(() => {
    console.log("Successfully connected to MongoDB");
}).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});

const productRoutes = require('./routes/products.routes');
app.use('/', productRoutes);

const categoryRoutes = require('./routes/categories.routes');
app.use('/', categoryRoutes);

const customerRoutes = require('./routes/customers.routes');
app.use('/', customerRoutes);

const orderRoutes = require('./routes/orders.routes');
app.use('/', orderRoutes);

const orderItemRoutes = require('./routes/orderItems.routes');
app.use('/', orderItemRoutes);



app.get('/', (req, res) => {
    return res.json('App Is Run V.1.1')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
