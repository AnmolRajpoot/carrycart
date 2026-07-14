const productModel = require("../models/product-model");

module.exports.createProduct = async (req, res) => {

    try {

        const {
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        } = req.body;

        const product = await productModel.create({

            image: req.file.buffer,

            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor

        });

        console.log(product);

        res.redirect("/shop");

    }
    catch (err) {

        console.log(err);

        res.status(500).send(err.message);

    }

};