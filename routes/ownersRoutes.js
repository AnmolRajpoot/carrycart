const express = require("express");
const router = express.Router();

const ownerModel = require("../models/owner-model");
const isLoggedIn = require("../middleware/isLoggedIn");

const upload = require("../config/multer-config");

const { createProduct } = require("../controllers/productController");

// Create Owner (Development Only)
if (process.env.NODE_ENV === "development") {

    router.post("/create", async (req, res) => {

        let owners = await ownerModel.find();

        if (owners.length > 0) {
            return res.status(503).send("Owner already exists");
        }

        const { fullname, email, password } = req.body;

        await ownerModel.create({
            fullname,
            email,
            password
        });

        res.send("Owner created successfully");

    });

}

// Admin Dashboard
router.get("/admin", isLoggedIn, (req, res) => {

    res.render("admin", {
        user: req.user
    });

});

// Create Product
router.post(
    "/product/create",
    isLoggedIn,
    upload.single("image"),
    createProduct
);

module.exports = router;