// // const express = require('express');
// // const { placeOrder, getUserOrders,getOrderDetails } = require('../controllers/orderController');
// // const { protect } = require('../middleware/authMiddleware');
// // const router = express.Router();

// // // POST /api/orders - Place an order
// // router.post('/', protect, placeOrder);

// // // GET /api/orders - Get all orders for the logged-in user
// // router.get('/', protect, getUserOrders);

// // // GET /api/orders/:id - Get details of a specific order
// // router.get('/:id', protect, getOrderDetails);
// // module.exports = router;
// const express = require('express');
// const auth = require("../middleware/authMiddleware"); // Adjust the path based on where `auth` is located

// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const { 
//     placeOrder, 
//     getUserOrders, 
//     getOrderById 
// } = require('../controllers/orderController');

// // Place order
// router.post('/', protect, placeOrder);

// // Get user's orders
// router.get('/', protect, getUserOrders);
// router.get("/", auth, async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;
  
//     try {
//       const totalOrders = await Order.countDocuments(); // Total number of orders
//       const orders = await Order.find()
//         .populate("user", "name email") // Populate user details
//         .skip(skip)
//         .limit(limit);
  
//       const totalPages = Math.ceil(totalOrders / limit);
  
//       res.status(200).json({
//         orders,
//         totalPages,
//       });
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       res.status(500).json({ message: "Server error." });
//     }
//   });
  
// // Get single order
// router.get('/:id', protect, getOrderById);

// module.exports = router;
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { 
    placeOrder, 
    getUserOrders, 
    getOrderById 
} = require('../controllers/orderController');

const router = express.Router();

// Place an order
router.post('/', protect, placeOrder);

// Get all orders for the logged-in user
router.get('/', protect, getUserOrders);  // This will now be handled by the getUserOrders controller

// Get details of a specific order by ID
router.get('/:id', protect, getOrderById);

module.exports = router;
