const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.redirect("/");
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.redirect("/");
        }

        req.user = user;

        next();

    } catch (err) {

        console.log(err);
        return res.redirect("/");

    }

};