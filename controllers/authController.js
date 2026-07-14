const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (user) {
            return res.status(401).send("User already exists");
        }

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(password, salt, async (err, hash) => {

                if (err) {
                    return res.status(500).send(err.message);
                }

                const user = await userModel.create({
                    fullname,
                    email,
                    password: hash
                });

                const token = generateToken(user);

                res.cookie("token", token);

                // res.send("User created successfully");
                res.redirect("/shop");

            });

        });

    } catch (err) {

        res.status(500).send(err.message);

    }
};

// to login user
module.exports.loginUser = async function(req,res){
    let { email, password } = req.body;
     
    let user = await userModel.findOne({email:email});
    if(!user){
        return res.send("Email or Password is incorrect");
    }

    bcrypt.compare(password,user.password,(err,result)=>{
        if (!result) {
            return res.send("Email or Password is incorrect");
        }

        const token = generateToken(user);
        res.cookie("token",token);
        // res.send("logged in successfully");
        res.redirect("/shop");
    })
}

module.exports.logout = function(req,res){
    res.cookie("token","");
    res.redirect("/")
}





