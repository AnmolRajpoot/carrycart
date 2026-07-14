const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout
} = require("../controllers/authController");

const {
    addToCart,
    cart
} = require("../controllers/userController");

const isLoggedIn = require("../middleware/isLoggedIn");

// Home
router.get("/", (req, res) => {
    res.send("usersRoutes working");
});

// Authentication
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

// Cart
router.post(
    "/addtocart/:productid",
    isLoggedIn,
    addToCart
);

router.get(
    "/cart",
    isLoggedIn,
    cart
);

module.exports = router;