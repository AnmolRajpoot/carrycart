const userModel = require("../models/user-model");

module.exports.addToCart = async function (req, res) {

    try {

        const user = await userModel.findById(req.user._id);

        if (!user.cart.includes(req.params.productid)) {

            user.cart.push(req.params.productid);

            await user.save();

        }

        res.redirect("/shop");

    }

    catch (err) {

        console.log(err);

        res.status(500).send(err.message);

    }

}

// ----------------------------

module.exports.cart = async function (req, res) {

    try {

        const user = await userModel
            .findById(req.user._id)
            .populate("cart");

        res.render("cart", {

            user,
            cart: user.cart

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).send(err.message);

    }

}