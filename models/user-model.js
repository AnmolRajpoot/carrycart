const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    fullname: String,

    email: String,

    password: String,

    contact: Number,

    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],

    orders: {
        type: Array,
        default: [],
    },

    picture: {
        type: String,
        default: ""
    }

});

module.exports = mongoose.model("user", userSchema);