const express = require("express");
const router = express.Router();

const upload = require("../config/multer-config");
const isLoggedIn = require("../middleware/isLoggedIn");

const { createProduct } = require("../controllers/productController");

// Create Product
router.post(
    "/create",
    isLoggedIn,
    upload.single("image"),
    createProduct
);

module.exports = router;